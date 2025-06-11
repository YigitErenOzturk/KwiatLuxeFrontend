document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const messageDiv = document.getElementById("message");

  // admin control 
  if (usernameInput === "admin" && passwordInput === "admin") {
    localStorage.setItem("username", "admin");
    localStorage.setItem("role", "admin");
    window.location.href = "../pages/admin.html";  
    return;  // important
  }

  // Test user control
  if (usernameInput === "testuser" && passwordInput === "1234") {
    localStorage.setItem("username", "testuser");
    localStorage.setItem("role", "user");
    window.location.href = "../pages/user.html";  
    return;  
  }

  
  try {
    const response = await fetch("https://api.example.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameInput, password: passwordInput }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        window.location.href = "../pages/admin.html";
      } else {
        window.location.href = "../pages/user.html";
      }
    } else {
      messageDiv.textContent = data.message || "Login failed";
      messageDiv.style.color = "red";
    }
  } catch (error) {
    messageDiv.textContent = "Network error, try again later.";
    messageDiv.style.color = "red";
  }
});
