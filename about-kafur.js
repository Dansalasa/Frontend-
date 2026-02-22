const API_BASE = "http://localhost:5000"; // canza idan server naka yana online

async function buyTicket(type = "silver") {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/buy-ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        ticketType: type
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    // Redirect to Paystack
    window.location.href = data.authorization_url;

  } catch (err) {
    console.error(err);
    alert("Network error");
  }
}