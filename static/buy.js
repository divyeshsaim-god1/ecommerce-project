// (linked to checkout.html)

document.getElementById('DOMContentLoaded', () => {
    const buyNowData = localStorage.getItem('buyNowItem');
    const cartData = localStorage.getItem('cart');

    let itemsToCheckout = [];

    if(buyNowData) {
        itemsToCheckout = [JSON.parse(buyNowData)];
    } else if (cartData) {
        itemsToCheckout = JSON.parse(cartData);
    }
})