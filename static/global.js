// Fetch cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem('my_web_cart')) || [];

// Function to add an item to the cart (Used on index.html)
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    saveCart();            // Saved inside global.js
    updateCartCountNav();  // Updated inside global.js
    alert(`${name} added to cart!`);
}

// Save current cart state to localStorage
function saveCart() {
    localStorage.setItem('my_web_cart', JSON.stringify(cart));
}



// Update the navbar total item count badge
function updateCartCountNav() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count-badge');
    if (badge) {
        badge.innerText = totalItems;
    }
}

// Automatically sync the navigation badge count across pages when they load
document.addEventListener('DOMContentLoaded', updateCartCountNav);
