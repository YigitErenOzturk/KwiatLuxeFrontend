const apiBaseUrl = "https://your-api-url.com"; // API URL'ni değiştir

document.addEventListener("DOMContentLoaded", () => {
  showWelcomeMessage();
  loadOrders();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logoutUser();
    });
  }
});

function showWelcomeMessage() {
  const username = localStorage.getItem("username") || "Guest";
  const welcomeUser = document.getElementById("welcomeUser");
  if (welcomeUser) {
    welcomeUser.textContent = `Welcome, ${username}!`;
  }
}

async function loadOrders() {
  const ordersContainer = document.getElementById("ordersContainer");
  if (!ordersContainer) return;

  
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${apiBaseUrl}/orders`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Failed to fetch orders");

    const orders = await response.json();

    if (!orders.length) {
      ordersContainer.innerHTML = "<p>You have no orders yet.</p>";
    } else {
      ordersContainer.innerHTML = "";
      orders.forEach(order => {
        ordersContainer.appendChild(createOrderCard(order));
      });
    }
  } catch (error) {
    console.error("Error - orders couldnt download:", error);
    ordersContainer.innerHTML = "<p style='color:red;'>Failed to load orders.</p>";
  }
}

function createOrderCard(order) {
  const card = document.createElement("div");
  card.className = "order-card";

  card.innerHTML = `
    <h3>Order #${order.id}</h3>
    <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
    <p><strong>Total Price:</strong> $${order.total.toFixed(2)}</p>
    <div class="order-items">
      <strong>Items:</strong>
      <ul>
        ${order.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join("")}
      </ul>
    </div>
  `;

  return card;
}

function logoutUser() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("shoppingCart");
  window.location.href = "pages/login.html";
}
