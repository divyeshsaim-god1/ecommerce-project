import { Store } from './store.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('delivery-container');
  const totalDisplay = document.getElementById('total-amount');

  const order = Store.getCurrentOrder();

  if (!order || !order.items || order.items.length === 0) {
    container.innerHTML = '<p>No active deliveries found.</p>';
    return;
  }

  let total = 0;
  container.innerHTML = '';

  order.items.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    container.innerHTML += `
      <div style="border-bottom: 1px solid #ccc; padding: 10px;">
        <img src="${item.image}" width="60">
        <h3>${item.name}</h3>
        <p>Qty: ${item.quantity} | Subtotal: ₹${itemTotal}</p>
        <p><strong>Status: Delivering by Tomorrow</strong></p>
      </div>
    `;
  });

  totalDisplay.innerText = `₹${total}`;
});