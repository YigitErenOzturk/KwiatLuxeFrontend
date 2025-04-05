document.addEventListener("DOMContentLoaded", function () {
    // Form submit olayý
    document.getElementById("restaurant-register-form").addEventListener("submit", async function (e) {
        e.preventDefault();  // blocking to refreshing page 

        // Formdan verileri al
        const restaurantData = {
            name: document.getElementById("restaurant-name").value,
            email: document.getElementById("restaurant-email").value,
            password: document.getElementById("restaurant-password").value,
            phoneNumber: document.getElementById("restaurant-phone").value,  
            description: document.getElementById("restaurant-description").value,  
            location: document.getElementById("restaurant-location").value, 
            imageUrl: document.getElementById("restaurant-image").value  
        };

        try {
            // sending post rekuest
            const response = await fetch("http://192.168.1.15:5000/api/restaurants/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(restaurantData)
            });

            // api answer
            const result = await response.json();

            // if succesfull transfer
            if (response.ok) {
                alert("Registration successful!");
                window.location.href = 'restaurant-login.html';  // page for transfer
            } else {
                console.error("Registration failed:", result);
                alert(result.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Something went wrong. Please try again.");
        }
    });
});
