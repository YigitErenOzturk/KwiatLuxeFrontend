document.getElementById("restaurant-login-form").addEventListener("submit", async function (e) {
    e.preventDefault();  

    const usernameOrEmail = document.getElementById('usernameOrEmail').value;
    const password = document.getElementById('restaurant-password').value;

    // API URL
    const apiUrl = "http://192.168.1.15:5000/api/restaurants/login";  // API

    const restaurantData = {
        usernameOrEmail: usernameOrEmail,
        password: password
    };

    try {
        console.log("Sending request to backend...");

        // Sending post rekuest to api
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(restaurantData),
        });

        const result = await response.json();  // take answer from api

        // if login succesfull
        if (response.ok) {
            console.log("Login successful:", result);
            alert("Login successful!");

            // waiting one secodn
            setTimeout(() => {
                window.location.href = "restaurant-main-menu.html";  // send restaurant main page
            }, 1000);
        } else {
            // if there is an error
            console.error("Login failed:", result);
            document.getElementById('error-message').innerText = result.message || 'Incorrect username or password!';
        }
    } catch (error) {
        console.error("API Error:", error);
        document.getElementById('error-message').innerText = 'Something went wrong. Please try again!';
    }
});
