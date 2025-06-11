const apiBaseUrl = "https://api.example.com"; 

document.addEventListener("DOMContentLoaded", () => {
  showWelcomeMessage();
  loadProducts();
  setupCart();
});

function showWelcomeMessage() {
  const username = localStorage.getItem("username") || "Guest";
  document.getElementById("welcomeUser").textContent = `Welcome, ${username}!`;
}

async function loadProducts() {
  try {
    const res = await fetch(`${apiBaseUrl}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const products = await res.json();

    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image || 'https://via.placeholder.com/200'}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description || ""}</p>
        <p><strong>$${product.price.toFixed(2)}</strong></p>
        <button data-id="${product.id}">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });

    productGrid.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        const product = products.find(p => p.id == id);
        if (product) addToCart(product);
      });
    });

  } catch (error) {
    document.getElementById("productGrid").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

let cart = [];

function setupCart() {
  cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  updateCartCount();
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  updateCartCount();
  alert(`Added "${product.name}" to cart.`);
}

function updateCartCount() {
  let count = cart.reduce((acc, item) => acc + item.quantity, 0);
 
  const welcomeUser = document.getElementById("welcomeUser");
  if (count > 0) {
    welcomeUser.textContent += ` | Cart Items: ${count}`;
  }
}
