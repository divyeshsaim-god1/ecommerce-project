// fetching 'cart' from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem('my_web_cart')) || [];

// function to add an item to the cart
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({id, name, price, image, quantity: 1});
    }

    saveCart();
    updateCartCountNav();
    alert(`${name} added to cart!`);
}

// Save current cart state to localStorage
function saveCart() {
    localStorage.setItem('my_web_cart', JSON.stringify(cart));
}

// update the navbar total item count badge
function updateCartCountNav() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count-badge');
    if(badge) {
        badge.innerText = totalItems;
    }
}

// function to display cart items
function displayCartItems() {
    const wrapper = document.getElementById('cart-items-wrapper');
    const totalSpan = document.getElementById('cart-total-price');
    
    if (!wrapper) return; 

    if (cart.length === 0) {
        wrapper.innerHTML = `<p class="empty-msg">Your cart is empty. Keep shopping!</p>`;
        totalSpan.innerText = "₹0";
        return;
    }

    let htmlContent = '';
    let overallTotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        overallTotal += itemTotal;

        htmlContent += `
            <div class="cart-item" style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px;">
                <div class="cart-item-details" style="flex-grow: 1;">
                    <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
                    <p class="price" style="margin: 0;">Price: ₹${item.price}</p>
                    <p class="subtotal" style="margin: 0; color: #b12704;">Subtotal: ₹${itemTotal}</p>
                </div>
                <div class="cart-item-actions">
                    <span class="qty-label">Qty: ${item.quantity}</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})" style="margin-left: 10px; padding: 5px 10px; background: red; color: white; border: none; cursor: pointer;">Remove</button>
                </div>
            </div>
        `;
    });

    wrapper.innerHTML = htmlContent;
    totalSpan.innerText = `₹${overallTotal}`;
}

// Function to remove an item completely from the cart
function removeFromCart(index) {
    cart.splice(index, 1); 
    saveCart();            
    displayCartItems();    
    updateCartCountNav();  
}

// Automatically sync the navigation badge count across pages when they load
updateCartCountNav();
