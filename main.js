const API = "https://festival-backend-6ica.onrender.com";

/* =====================
   HELPER FUNCTION
===================== */
function getToken() {
  return localStorage.getItem("token");
}

function redirectIfNoToken() {
  if (!getToken()) {
    window.location.href = "login.html";
  }
}

/* =====================
   REGISTER
===================== */
async function registerUser() {
  const username = document.getElementById("username")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(API + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      window.location.href = "login.html";
    }
  } catch (err) {
    alert("Server error");
  }
}

/* =====================
   LOGIN
===================== */
async function loginUser() {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
      window.location.href = "dashboard.html";
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Login failed");
  }
}

/* =====================
   LOAD PROFILE
===================== */
async function loadProfile() {
  const token = getToken();
  if (!token) {
    redirectIfNoToken();
    return;
  }

  try {
    const res = await fetch(API + "/profile", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();

    if (res.ok) {
      if (document.getElementById("username"))
        document.getElementById("username").innerText = data.username;

      if (document.getElementById("coins"))
        document.getElementById("coins").innerText = data.coins || 0;

      if (document.getElementById("ticket"))
        document.getElementById("ticket").innerText =
          data.ticketCode || "No Ticket";
    } else {
      redirectIfNoToken();
    }
  } catch (err) {
    console.log(err);
  }
}

/* =====================
   LOGOUT
===================== */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  window.location.href = "login.html";
}

/* =====================
   BUY TICKET
===================== */
async function buyTicket(type) {
  const email = localStorage.getItem("email");
  if (!email) return redirectIfNoToken();

  try {
    const res = await fetch(API + "/buy-ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, ticketType: type })
    });

    const data = await res.json();
    if (res.ok) {
      window.location.href = data.data.authorization_url;
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Payment failed");
  }
}

/* =====================
   BUY COINS
===================== */
async function buyCoins(amount, coins) {
  const email = localStorage.getItem("email");
  if (!email) return redirectIfNoToken();

  try {
    const res = await fetch(API + "/pay-coins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount, coins })
    });

    const data = await res.json();
    if (res.ok) {
      window.location.href = data.data.authorization_url;
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Payment failed");
  }
}

/* =====================
   VERIFY TICKET
===================== */
async function verifyTicket() {
  const code = document.getElementById("ticketCode")?.value.trim();
  if (!code) {
    alert("Enter ticket code");
    return;
  }

  try {
    const res = await fetch(API + "/verify-ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketCode: code })
    });

    const data = await res.json();
    alert(data.message);
  } catch (err) {
    alert("Verification failed");
  }
}

/* =====================
   VOTE
===================== */
async function vote(category, candidate) {
  const token = getToken();
  if (!token) return redirectIfNoToken();

  try {
    const res = await fetch(API + "/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ category, candidate })
    });

    const data = await res.json();
    alert(data.message);
  } catch (err) {
    alert("Vote failed");
  }
}