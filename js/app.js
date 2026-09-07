import { fetchProducts } from './api.js';
import { Store } from './store.js';
import { renderProductList } from './ui.js';

let allProducts = [];

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('product-grid');
  const searchInput = document.getElementById('search-input');
  const categorySelect = document.getElementById('category-filter');

  // Load Products
  allProducts = await fetchProducts();
  renderProductList(allProducts, grid);

  // Event Delegation for Buttons
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    const productId = card.dataset.id;
    const selectedProduct = allProducts.find(p => p.id === productId);

    if (e.target.classList.contains('btn-add')) {
      Store.addToCart(selectedProduct);
      alert('Added to cart!');
    } else if (e.target.classList.contains('btn-buy')) {
      Store.setBuyNow(selectedProduct);
      window.location.href = 'checkout.html';
    }
  });

  // Filter Logic
  function applyFilters() {
    const term = searchInput.value.toLowerCase().trim();
    const cat = categorySelect.value;

    const filtered = allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(term);
      const matchesCat = cat === 'All' || p.category === cat;
      return matchesSearch && matchesCat;
    });

    renderProductList(filtered, grid);
  }

  searchInput.addEventListener('input', applyFilters);
  categorySelect.addEventListener('change', applyFilters);
});