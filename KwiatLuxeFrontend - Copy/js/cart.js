document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  setupCheckout();
});

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalElem = document.getElementById('cartTotal');

  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<li>Your cart is empty.</li>';
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      cartItemsContainer.appendChild(li);
      total += item.price * item.quantity;
    });
  }

  cartTotalElem.textContent = total.toFixed(2);
}

function setupCheckout() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  checkoutBtn.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if(cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // Create order info
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
      id: Date.now(),
      items: cart,
      total: cart.reduce((acc, i) => acc + i.price * i.quantity, 0),
      date: new Date().toISOString(),
      status: 'Placed'  // Order placed status
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear the cart
    localStorage.removeItem('shoppingCart');

    alert('Payment successful! Your order has been placed.');

    // Refresh cart page
    renderCart();

    
  });
}
