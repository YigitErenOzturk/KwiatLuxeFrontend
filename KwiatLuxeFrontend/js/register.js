document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username").value.trim();
  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const messageDiv = document.getElementById("message");

  try {
    const response = await fetch("https://senin-api-adresin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameInput, email: emailInput, password: passwordInput }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role || "user");
      window.location.href = "user.html";
    } else {
      messageDiv.textContent = data.message || "Registration failed";
      messageDiv.style.color = "red";
    }
  } catch (error) {
    messageDiv.textContent = "Network error, try again later.";
    messageDiv.style.color = "red";
  }
});
