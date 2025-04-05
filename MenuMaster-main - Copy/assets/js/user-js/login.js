document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();  // Blocking to refresh the page

    const usernameOrEmail = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // API URL
    const apiUrl = "http://192.168.1.15:5000/api/users/login";  // API URL Controller

    const userData = {
        usernameOrEmail: usernameOrEmail,
        password: password
    };

    try {
        console.log("Sending request to backend...");

        // Sending Post
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();  // Take the answer from server

        // If login is successful
        if (response.ok) {
            console.log("Login successful:", result);
            alert("Login successful!");

            // Kullanıcı adını localStorage'a kaydet
            localStorage.setItem("loggedInUser", result.username);

            // 1 second waiting
            setTimeout(() => {
                window.location.href = "../../MenuMaster/userfiles/usermainmenu.html";  
            }, 1000);  
        } else {
            // Show error message
            console.error("Login failed:", result);
            document.getElementById('error-message').innerText = result.message || 'Incorrect username or password!';
        }
    } catch (error) {
        console.error("API Error:", error);
        document.getElementById('error-message').innerText = 'Something went wrong. Please try again!';
    }
});
