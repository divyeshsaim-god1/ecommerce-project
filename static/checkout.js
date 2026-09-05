// checkout.js
document.getElementById('submission-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Get ordered items from localStorage
    const buyNowData = localStorage.getItem('buyNowItem');
    const cartData = localStorage.getItem('cart');

    let orderItems = [];

    if (buyNowData) {
        orderItems = [JSON.parse(buyNowData)];
    } else if (cartData) {
        orderItems = JSON.parse(cartData);
    }

    if (orderItems.length === 0) {
        alert("No items found to checkout!");
        return;
    }

    // 2. Save order details to 'currentOrder' for delivery.html to read
    const orderDetails = {
        items: orderItems,
        customer: {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        },
        orderDate: new Date().toLocaleDateString()
    };

    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));

    // 3. Clear temporary purchase storage
    localStorage.removeItem('buyNowItem');
    localStorage.removeItem('cart');

    // 4. Feedback & Redirect to delivery page
    document.getElementById('submit-msg').innerText = "Order placed! Redirecting...";
    
    setTimeout(() => {
        window.location.href = 'delivery.html';
    }, 1000);
});