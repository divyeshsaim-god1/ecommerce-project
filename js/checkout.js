import { Store } from './store.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const buyNowItem = Store.getBuyNow();
    const cart = Store.getCart();

    let itemsToOrder = buyNowItem ? [buyNowItem] : cart;

    if (itemsToOrder.length === 0) {
      alert('Your order is empty!');
      return;
    }

    const orderData = {
      items: itemsToOrder,
      customer: {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
      },
      orderDate: new Date().toLocaleDateString()
    };

    Store.saveOrder(orderData);
    window.location.href = 'delivery.html';
  });
});