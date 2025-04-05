document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get("id");

    if (!restaurantId) {
        document.querySelector(".restaurant-profile").innerHTML = "<p>Restaurant not found.</p>";
        return;
    }

    try {
        // API
        const response = await fetch(`http://192.168.1.15:5000/api/restaurants/${restaurantId}`);
        const restaurant = await response.json();

        if (!response.ok) {
            throw new Error(restaurant.message || "Failed to fetch restaurant data");
        }

        
        document.getElementById("restaurantName").textContent = restaurant.name;
        document.getElementById("restaurantAddress").textContent = restaurant.address;
        document.getElementById("restaurantPhone").textContent = `Phone: ${restaurant.phone}`;
        document.getElementById("restaurantDescription").textContent = restaurant.description;

        // Google Maps 
        const mapFrame = document.getElementById("mapFrame");
        const encodedAddress = encodeURIComponent(restaurant.address); // Adresi Google Maps için encode ediyoruz
        mapFrame.src = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

        // comments
        loadReviews(restaurantId);

    } catch (error) {
        console.error("Error fetching restaurant details:", error);
        document.querySelector(".restaurant-profile").innerHTML = "<p>Failed to load restaurant details.</p>";
    }
});

// load comments
async function loadReviews(restaurantId) {
    try {
        const response = await fetch(`http://192.168.1.15:5000/api/restaurants/${restaurantId}/reviews`);
        const reviews = await response.json();

        const reviewsContainer = document.getElementById("reviewsContainer");
        reviewsContainer.innerHTML = reviews.length
            ? reviews.map(r => `<p><strong>${r.user}:</strong> ${r.comment}</p>`).join("")
            : "<p>No reviews yet.</p>";

    } catch (error) {
        console.error("Error loading reviews:", error);
        document.getElementById("reviewsContainer").innerHTML = "<p>Failed to load reviews.</p>";
    }
}

// add comment
async function submitReview() {
    const restaurantId = new URLSearchParams(window.location.search).get("id");
    const username = localStorage.getItem("loggedInUser") || "Guest";
    const comment = document.getElementById("reviewText").value.trim();

    if (!comment) {
        alert("Please enter a review.");
        return;
    }

    try {
        const response = await fetch(`http://192.168.1.15:5000/api/restaurants/${restaurantId}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: username, comment })
        });

        if (!response.ok) {
            throw new Error("Failed to submit review");
        }

        document.getElementById("reviewText").value = "";
        loadReviews(restaurantId);
    } catch (error) {
        console.error("Error submitting review:", error);
    }
}

// reservation
async function makeReservation() {
    const restaurantId = new URLSearchParams(window.location.search).get("id");
    const username = localStorage.getItem("loggedInUser") || "Guest";
    const date = document.getElementById("reservationDate").value;
    const time = document.getElementById("reservationTime").value;
    const people = document.getElementById("reservationPeople").value;

    if (!date || !time || !people) {
        alert("Please fill all reservation details.");
        return;
    }

    try {
        const response = await fetch(`http://192.168.1.15:5000/api/restaurants/${restaurantId}/reservations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: username, date, time, people })
        });

        if (!response.ok) {
            throw new Error("Failed to make reservation");
        }

        alert("Reservation successful!");
    } catch (error) {
        console.error("Error making reservation:", error);
    }
}
