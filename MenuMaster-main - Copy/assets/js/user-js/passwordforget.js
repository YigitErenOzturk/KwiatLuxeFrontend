document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const responseMessage = document.getElementById("response-message");

    fetch("http://192.168.1.15:5000/api/users/api/password-reset-request", { // Backend API URL
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            responseMessage.textContent = "Password reset link has been sent to your email!";
            responseMessage.style.color = "green";
        } else {
            responseMessage.textContent = "Error: " + data.message;
            responseMessage.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        responseMessage.textContent = "An error occurred while sending the request.";
        responseMessage.style.color = "red";
    });
});
