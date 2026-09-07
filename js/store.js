export const Store = {
  getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  },
  
  addToCart(product) {
    const cart = this.getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  setBuyNow(product) {
    localStorage.setItem('buyNowItem', JSON.stringify({ ...product, quantity: 1 }));
  },

  getBuyNow() {
    return JSON.parse(localStorage.getItem('buyNowItem'));
  },

  saveOrder(orderDetails) {
    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
    localStorage.removeItem('buyNowItem');
    localStorage.removeItem('cart');
  },

  getCurrentOrder() {
    return JSON.parse(localStorage.getItem('currentOrder'));
  }
};