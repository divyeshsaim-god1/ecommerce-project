// creating a product object
// products.js
const products = [
  {
    id: "prod_101",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    image: "https://via.placeholder.com/150",
    description: "High-quality noise-canceling wireless headphones."
  },
  {
    id: "prod_102",
    name: "Smart Watch v2",
    category: "Electronics",
    price: 4999,
    image: "https://via.placeholder.com/150",
    description: "Track steps, heart rate, and notifications."
  },
  {
    id: "prod_103",
    name: "Classic Denim Jacket",
    category: "Fashion",
    price: 1899,
    image: "https://via.placeholder.com/150",
    description: "Stylish everyday jacket made with 100% cotton."
  },
  {
    id: "prod_104",
    name: "Running Sneakers",
    category: "Fashion",
    price: 2499,
    image: "https://via.placeholder.com/150",
    description: "Lightweight and breathable athletic shoes."
  },
  {
    id: "prod_105",
    name: "Ergonomic Office Chair",
    category: "Home",
    price: 7999,
    image: "https://via.placeholder.com/150",
    description: "Lumbar support chair for long work hours."
  },
  {
    id: "prod_106",
    name: "Stainless Steel Water Bottle",
    category: "Home",
    price: 599,
    image: "https://via.placeholder.com/150",
    description: "Insulated 1L bottle keeps liquids cold for 24 hours."
  }
];

// code to render and filter products
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

// Function to render product cards
function renderProducts(items) {
    productGrid.innerHTML = ''; // Clear previous cards

    if (items.length === 0) {
        productGrid.innerHTML = '<p>No products match your search.</p>';
        return;
    }

    items.forEach(product => {
        productGrid.innerHTML += `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="category">${product.category}</p>
            <p class="price">₹${product.price}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
            <button onclick="buyNow('${product.id}')">Buy Now</button>
        </div>
        `;
    });
}

// master filter function combining search + category
function filterProducts() {
    const searchTerm = searchInput.ariaValueMax.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filtered = products.filter(product => {
        // check search match (name or description)
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.description.toLocaleLowerCase().includes(searchTerm);

        // check category match
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
}

// Event listeners
searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

// Function to display cart items (Used on cart.html)
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

// Function to remove an item completely from the cart (Used on cart.html)
function removeFromCart(index) {
    cart.splice(index, 1); 
    saveCart();            
    displayCartItems();    
    updateCartCountNav();  
}


// Buy Now logic specific to clicking the button in index.html
function buyNow(product) {
    localStorage.setItem('buyNowItem', JSON.stringify(product));
    window.location.href = 'checkout.html';
}

// Attach event listener to the button
document.getElementById('buy-now-btn').addEventListener('click', () => {
    buyNow(currentProduct);
});


// Initial Render on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});