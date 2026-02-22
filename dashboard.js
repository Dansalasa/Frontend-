function toggleMenu(){
  document.getElementById("menuList").classList.toggle("hidden");
}

function goPage(page){
  window.location.href = page;
}

function logout(){
  window.location.href = "login.html"; // ko index.html
}