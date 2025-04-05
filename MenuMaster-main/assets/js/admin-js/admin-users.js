async function fetchUsers() {
    try {
        const response = await fetch("http://192.168.1.15:5000/api/users"); 
        const users = await response.json();
        
        const userTableBody = document.getElementById("userTableBody");
        userTableBody.innerHTML = ""; // Clean the table

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><button onclick="deleteUser(${user.id})">Delete</button></td>
            `;
            userTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function deleteUser(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
        const response = await fetch(`http://192.168.1.15:5000/api/users${userId}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("User deleted successfully!");
            fetchUsers(); // take back to updated list
        } else {
            alert("Failed to delete user.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

// when page uploaded take users from api
window.onload = fetchUsers;
