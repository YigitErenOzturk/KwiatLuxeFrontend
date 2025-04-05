document.addEventListener("DOMContentLoaded", function() {
    // Load Username
    let username = localStorage.getItem("loggedInUser");
    document.getElementById("welcomeUser").textContent = username ? username : "Guest";

    // Menu Open And Close
    const menuToggleButton = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    menuToggleButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });
});

// Logout
function logout() {
    localStorage.removeItem("loggedInUser"); // Username Deleting
    window.location.href = "../index.html"; // Send İndex
}

// Simulated restaurant data for each city
const simulatedRestaurants = {
    "Warsaw": [
        { id: 1, name: "Warsaw Restaurant 1", address: "Street 123, Warsaw", phone: "+48 123 456 789" },
        { id: 2, name: "Warsaw Restaurant 2", address: "Street 456, Warsaw", phone: "+48 987 654 321" }
    ],
    "Krakow": [
        { id: 3, name: "Krakow Restaurant 1", address: "Street 123, Krakow", phone: "+48 112 233 445" },
        { id: 4, name: "Krakow Restaurant 2", address: "Street 789, Krakow", phone: "+48 556 667 788" }
    ],
    "Poznan": [
        { id: 5, name: "Poznan Restaurant 1", address: "Street 123, Poznan", phone: "+48 345 678 910" },
        { id: 6, name: "Poznan Restaurant 2", address: "Street 987, Poznan", phone: "+48 234 567 890" }
    ],
    "Gdansk": [
        { id: 7, name: "Gdansk Restaurant 1", address: "Street 123, Gdansk", phone: "+48 123 456 789" },
        { id: 8, name: "Gdansk Restaurant 2", address: "Street 654, Gdansk", phone: "+48 999 888 777" }
    ],
    "Wroclaw": [
        { id: 9, name: "Wroclaw Restaurant 1", address: "Street 123, Wroclaw", phone: "+48 765 432 198" },
        { id: 10, name: "Wroclaw Restaurant 2", address: "Street 321, Wroclaw", phone: "+48 234 567 890" }
    ]
};

// Restaurant Listing
async function findRestaurants() {
    const city = document.getElementById('city').value;
    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = ''; // Cleaning old list

    if (!city) {
        alert('Please select a city');
        return;
    }

    try {
        // Restaurant List from API
        const apiUrl = `http://192.168.1.15:5000/api/restaurants?city=${city}`; 

        // Send GET request to API
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Take restaurant data from API
        const restaurants = await response.json();

        // If API request was unsuccessful
        if (!response.ok) {
            throw new Error(restaurants.message || "Failed to fetch restaurants");
        }

        // If no restaurants are returned from the API
        if (restaurants.length === 0) {
            restaurantList.innerHTML = '<p>No restaurants found in this city.</p>';
            return;
        }

        // List restaurants from API
        const listHTML = restaurants.map(restaurant => `
            <div class="restaurant-item">
                <h3><a href="../restaurantfiles/restaurant-profileusers.html?id=${restaurant.id}">${restaurant.name}</a></h3>
                <p>${restaurant.address}</p>
                <p><strong>Phone:</strong> ${restaurant.phone}</p>
            </div>
        `).join('');
        
        restaurantList.innerHTML = listHTML;

    } catch (error) {
        console.error("Error fetching restaurants:", error);

        // Simulate restaurant data when API fails
        const simulatedData = simulatedRestaurants[city];

        if (simulatedData && simulatedData.length > 0) {
            const simulatedHTML = simulatedData.map(restaurant => `
                <div class="restaurant-item">
                    <h3><a href="../restaurantfiles/restaurant-profileusers.html?id=${restaurant.id}">${restaurant.name}</a></h3>
                    <p>${restaurant.address}</p>
                    <p><strong>Phone:</strong> ${restaurant.phone}</p>
                </div>
            `).join('');
            
            restaurantList.innerHTML = simulatedHTML;
        } else {
            restaurantList.innerHTML = '<p>Failed to load restaurants. Please try again later.</p>';
        }
    }
}
