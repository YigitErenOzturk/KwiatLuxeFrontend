const apiBaseUrl = "https://api.example.com"; // Replace with your API URL

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  renderPurchases();
});

// Load products from API and show them
async function loadProducts() {
  try {
    const res = await fetch(`${apiBaseUrl}/products`);
    if (!res.ok) throw new Error("Failed to load products.");
    const products = await res.json();

    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
      const li = document.createElement("li");
      li.dataset.id = product.id;

      li.innerHTML = `
        <strong>${product.name}</strong> - <span class="price">$${product.price.toFixed(2)}</span><br>
        <p class="description">${product.description}</p><br>
        <img src="${product.image}" alt="${product.name}" width="100"><br>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `;

      productList.appendChild(li);
    });

    // Add click events to buttons
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", handleDelete);
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", handleEdit);
    });

  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

// Delete product by id
async function handleDelete(e) {
  const li = e.target.closest("li");
  const id = li.dataset.id;

  if (!confirm("Are you sure to delete this product?")) return;

  try {
    const res = await fetch(`${apiBaseUrl}/products/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      alert("Product deleted.");
      loadProducts();
    } else {
      alert("Deletion failed.");
    }
  } catch (error) {
    alert("Cannot connect to server.");
    console.error(error);
  }
}

// Fill form to edit product
function handleEdit(e) {
  const li = e.target.closest("li");
  const id = li.dataset.id;
  const name = li.querySelector("strong").textContent;
  const description = li.querySelector(".description").textContent.trim();
  const priceText = li.querySelector(".price").textContent.trim();
  const price = parseFloat(priceText.replace("$", ""));
  const image = li.querySelector("img").src;

  document.getElementById("productName").value = name;
  document.getElementById("productDescription").value = description;
  document.getElementById("productPrice").value = price;
  document.getElementById("productImage").value = image;

  // Switch to update mode
  const form = document.getElementById("addProductForm");
  form.dataset.editId = id;
  form.querySelector("button").textContent = "Update Product";
}

// Submit form: add or update product
document.getElementById("addProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const name = document.getElementById("productName").value.trim();
  const description = document.getElementById("productDescription").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value.trim();

  if (!name || !description || isNaN(price) || !image) {
    alert("Please fill in all fields.");
    return;
  }

  const productData = { name, description, price, image };
  const editId = form.dataset.editId;

  try {
    let res;
    if (editId) {
      // Update product
      res = await fetch(`${apiBaseUrl}/products/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    } else {
      // Add new product
      res = await fetch(`${apiBaseUrl}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    }

    if (res.ok) {
      alert(editId ? "Product updated." : "Product added successfully.");
      form.reset();
      delete form.dataset.editId;
      form.querySelector("button").textContent = "Add Product";
      loadProducts();
    } else {
      alert("Operation failed.");
    }
  } catch (error) {
    alert("Cannot connect to server.");
    console.error(error);
  }
});

// Show purchase history from localStorage
function renderPurchases() {
  const purchasesList = document.getElementById("purchasesList");
  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

  if (purchases.length === 0) {
    purchasesList.innerHTML = "<p>No purchases yet.</p>";
    return;
  }

  purchasesList.innerHTML = purchases.map(purchase => {
    const itemsHtml = purchase.items.map(item =>
      `<li>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`
    ).join("");

    return `
      <div class="purchase-record">
        <strong>Buyer:</strong> ${purchase.buyer}<br/>
        <strong>Date:</strong> ${new Date(purchase.date).toLocaleString()}<br/>
        <strong>Address:</strong> ${purchase.address}<br/>
        <strong>Status:</strong> ${purchase.status || "Order placed"}<br/>
        <strong>Items:</strong>
        <ul>${itemsHtml}</ul>
      </div>
      <hr/>
    `;
  }).join("");
}
