const apiBaseUrl = "https://your-api-url.com";

document.addEventListener("DOMContentLoaded", () => {
  showWelcomeMessage();
  loadProducts();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }

  const ordersBtn = document.getElementById("ordersBtn");
  if (ordersBtn) {
    ordersBtn.addEventListener("click", goToOrdersPage);
  }
});

function showWelcomeMessage() {
  const username = localStorage.getItem("username") || "Guest";
  const welcomeUser = document.getElementById("welcomeUser");
  if (welcomeUser) {
    welcomeUser.textContent = `Welcome, ${username}!`;
  }
}

async function loadProducts() {
  const productGrid = document.getElementById("productGrid");
  if (!productGrid) return;

  try {
    const response = await fetch(`${apiBaseUrl}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    const products = await response.json();

    if (!products.length) {
      showSampleProduct(productGrid);
    } else {
      productGrid.innerHTML = "";
      products.forEach(product => {
        productGrid.appendChild(createProductCard(product));
      });
    }
  } catch (error) {
    console.error("we couldnt find api:", error);
    showSampleProduct(productGrid);
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image || "https://via.placeholder.com/300x200?text=No+Image"}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <span>$${product.price.toFixed(2)}</span>
    <button class="details-btn">Show Details</button>
    <button class="add-cart-btn">Add to Cart</button>
  `;

  card.querySelector(".details-btn").addEventListener("click", () => {
    showProductModal(product);
  });

  card.querySelector(".add-cart-btn").addEventListener("click", () => {
    window.location.href = "pages/login.html";
  });

  return card;
}

function showSampleProduct(productGrid) {
  const sample = {
    name: "Sample Bouquet",
    description: "This is a placeholder flower while products load.",
    price: 19.99,
    image: "https://via.placeholder.com/300x200?text=Sample+Bouquet"
  };
  productGrid.innerHTML = "";
  productGrid.appendChild(createProductCard(sample));
}

function logoutUser() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("shoppingCart");
  window.location.href = "login.html";
}

function goToOrdersPage() {
  window.location.href = "orders.html";
}

function showProductModal(product) {
  alert(`Product: ${product.name}\nDescription: ${product.description || "No description"}\nPrice: $${product.price.toFixed(2)}`);
}
