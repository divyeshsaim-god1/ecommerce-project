// delivery.js
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('delivery-container');
    const totalSpan = document.getElementById('delivery-total-price');

    if (!wrapper || !totalSpan) return;

    // Read the active order saved during checkout
    const savedOrder = localStorage.getItem('currentOrder');

    if (!savedOrder) {
        wrapper.innerHTML = `<p class="empty-msg">No active deliveries found. Keep shopping!</p>`;
        totalSpan.innerText = "₹0";
        return;
    }

    const orderData = JSON.parse(savedOrder);
    const items = orderData.items;

    let htmlContent = '';
    let overallTotal = 0;

    items.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        overallTotal += itemTotal;

        htmlContent += `
            <div class="cart-item" style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px;">
                <div class="cart-item-details" style="flex-grow: 1;">
                    <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
                    <p style="margin: 0;">Price: ₹${item.price}</p>
                    <p style="margin: 0; color: #b12704;">Subtotal: ₹${itemTotal}</p>
                    <p style="margin: 0; color: #565959;">Estimated Delivery: <b>Tomorrow</b></p>
                </div>
                <div>
                    <span>Qty: ${item.quantity}</span>
                </div>
            </div>
        `;
    });

    wrapper.innerHTML = htmlContent;
    totalSpan.innerText = `₹${overallTotal}`;
});