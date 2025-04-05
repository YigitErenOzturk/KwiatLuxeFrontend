document.addEventListener("DOMContentLoaded", function () {
    const restaurantDropdown = document.getElementById("restaurant");
    const recommendedList = document.querySelector(".recommended-list");

    // Take Restaurants
    async function loadRestaurants() {
        try {
            const response = await fetch("http://192.168.1.15:5000/api/restaurants"); // Backend API
            const data = await response.json();

            if (!data.success) {
                throw new Error("Failed to fetch restaurants");
            }

            // Dropdown restaurant add
            data.restaurants.forEach(restaurant => {
                const option = document.createElement("option");
                option.value = restaurant.id;
                option.textContent = restaurant.name;
                restaurantDropdown.appendChild(option);
            });

            // Recommend restaurants add
            recommendedList.innerHTML = ""; // clean
            data.restaurants.forEach(restaurant => {
                const div = document.createElement("div");
                div.classList.add("restaurant-item");
                div.innerHTML = `
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.description}</p>
                `;
                recommendedList.appendChild(div);
            });

        } catch (error) {
            console.error("Error loading restaurants:", error);
        }
    }

    // when page is loaded add restaurants
    loadRestaurants();
});
