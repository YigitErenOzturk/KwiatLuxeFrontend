document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
        name: document.getElementById("user-name").value,
        username: document.getElementById("user-username").value,
        email: document.getElementById("user-email").value,
        phonenumber: document.getElementById("user-phonenumber").value,
        address: document.getElementById("user-address").value,
        password: document.getElementById("user-password").value,
    };

    try {
        const response = await fetch("http://192.168.1.15:5000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        if (result.success) {
            alert("Register successful!");

            // Waiting for a second to change page after login
            setTimeout(() => {
                window.location.href = "../../userfiles/user-login.html";  
            }, 1000);  
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("API Error:", error);
        alert("Something went wrong. Please try again!");
    }
});
