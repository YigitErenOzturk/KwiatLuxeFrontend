document.addEventListener("DOMContentLoaded", function () {
    fetch("http://192.168.1.15:5000/api/restaurants") // Backend API adresini güncelle
        .then(response => response.json())
        .then(data => {
            const restaurantList = document.querySelector(".recommended-list");
            restaurantList.innerHTML = ""; // Önceki içeriği temizle

            data.forEach(restaurant => {
                const restaurantCard = document.createElement("div");
                restaurantCard.classList.add("restaurant-card");

                restaurantCard.innerHTML = `
                    <img src="${restaurant.image}" alt="Restaurant Image">
                    <h3>${restaurant.name}</h3>
                    <p>Location: ${restaurant.location}</p>
                    <button onclick="window.location.href='${restaurant.profileUrl}'">View Profile</button>
                `;

                restaurantList.appendChild(restaurantCard);
            });
        })
        .catch(error => {
            console.error("Error loading restaurants:", error);
        });
});
