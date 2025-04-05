document.addEventListener("DOMContentLoaded", async function () {
    const userProfileSection = document.querySelector(".profile-info");
    const reviewsList = document.querySelector(".review-list");
    const favoritesList = document.querySelector(".favorite-list");

    // Get logged-in username
    const username = localStorage.getItem("loggedInUser");

    // If user is not logged in, show alert and redirect to login page
    if (!username) {
        alert("Please log in first!");
        window.location.href = "../userfiles/user-login.html"; // Redirect to login page
        return;
    }

    try {
        // API URL - User Information
        const apiUrl = `http://192.168.1.15:5000/api/users/profile?username=${username}`;

        // Fetch user data
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const userData = await response.json();

        if (!response.ok) {
            throw new Error(userData.message || "Failed to fetch user data");
        }

        // Update User Information
        userProfileSection.innerHTML = `
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>City:</strong> ${userData.city || "Not specified"}</p>
        `;

        // Display User Reviews
        reviewsList.innerHTML = userData.reviews?.length
            ? userData.reviews.map(review => `<li>${review.text} ⭐⭐⭐⭐</li>`).join('')
            : "<li>No reviews yet.</li>";

        // Display User Favorite Restaurants
        favoritesList.innerHTML = userData.favorites?.length
            ? userData.favorites.map(restaurant => `<li>${restaurant.name}</li>`).join('')
            : "<li>No favorite restaurants.</li>";

    } catch (error) {
        console.error("Error fetching user profile:", error);
        userProfileSection.innerHTML = "<p>Failed to load profile data.</p>";
    }
});

// Delete Account
async function confirmDelete() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        try {
            const username = localStorage.getItem("loggedInUser");
            const apiUrl = `http://192.168.1.15:5000/api/users/delete?username=${username}`;

            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to delete account");
            }

            alert("Your account has been deleted.");
            localStorage.removeItem("loggedInUser"); // Logout
            window.location.href = '../index.html'; // Redirect to main page
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Failed to delete account. Please try again.");
        }
    }
}
