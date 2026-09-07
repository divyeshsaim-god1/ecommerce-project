export function renderProductList(products, containerElement) {
  containerElement.innerHTML = '';

  if (products.length === 0) {
    containerElement.innerHTML = '<p>No products available.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="150">
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p><strong>₹${product.price}</strong></p>
      <button class="btn-add">Add to Cart</button>
      <button class="btn-buy">Buy Now</button>
    `;

    containerElement.appendChild(card);
  });
}