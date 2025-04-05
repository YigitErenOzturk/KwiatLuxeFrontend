async function fetchRestaurants() {
    try {
        const response = await fetch("https://api.menumaster.com/admin/restaurants"); // API URL'ini güncelle
        const restaurants = await response.json();
        
        const restaurantTableBody = document.getElementById("restaurantTableBody");
        restaurantTableBody.innerHTML = ""; // Önce tabloyu temizle

        restaurants.forEach(restaurant => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${restaurant.name}</td>
                <td>${restaurant.city}</td>
                <td>
                    <button onclick="editRestaurant(${restaurant.id})">Edit</button>
                    <button onclick="deleteRestaurant(${restaurant.id})">Delete</button>
                </td>
            `;
            restaurantTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
}

async function deleteRestaurant(restaurantId) {
    if (!confirm("Are you sure you want to delete this restaurant?")) return;

    try {
        const response = await fetch(`https://api.menumaster.com/admin/restaurants/${restaurantId}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Restaurant deleted successfully!");
            fetchRestaurants(); // Güncellenmiş listeyi tekrar getir
        } else {
            alert("Failed to delete restaurant.");
        }
    } catch (error) {
        console.error("Error deleting restaurant:", error);
    }
}

function editRestaurant(restaurantId) {
    window.location.href = `edit-restaurant.html?id=${restaurantId}`; // Düzenleme sayfasına yönlendirme
}

// Sayfa yüklenince restoranları çek
window.onload = fetchRestaurants;
