document.addEventListener("DOMContentLoaded", function () {
    // Giriş yapan restoranın ID'sini localStorage'dan al
    const restaurantId = localStorage.getItem("restaurantId");

    if (!restaurantId) {
        alert("Restaurant ID not found. Please log in again.");
        window.location.href = "../userfiles/user-login.html"; // Login sayfasına yönlendir
        return;
    }

    // API'den restoran bilgilerini çek
    fetch(`http://192.168.1.15:5000/api/restaurants/${restaurantId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("restaurant-name").textContent = data.name;
            document.getElementById("restaurant-address").textContent = data.address;
            document.getElementById("restaurant-phone").textContent = data.phone;
        })
        .catch(error => {
            console.error("Error loading restaurant profile:", error);
        });
});
