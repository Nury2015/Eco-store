const Cart = {
  items: [],

  load() {
    try {
      const saved = localStorage.getItem('eco_cart');
      if (saved) this.items = JSON.parse(saved);
    } catch (_) {
      this.items = [];
    }
    this.render();
  },

  save() {
    localStorage.setItem('eco_cart', JSON.stringify(this.items));
  },

  add(product, qty = 1) {
    const existing = this.items.find(i => i.name === product.name);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ name: product.name, price: product.price, image: product.image, qty });
    }
    this.save();
    this.render();
    const label = qty > 1 ? ` (×${qty})` : '';
    Toast.show(`${product.name}${label} agregado`);
  },

  updateQty(index, delta) {
    const item = this.items[index];
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.items.splice(index, 1);
    this.save();
    this.render();
  },

  remove(index) {
    this.items.splice(index, 1);
    this.save();
    this.render();
  },

  render() {
    const badge   = document.getElementById('cart_count');
    const itemsEl = document.getElementById('cart_items');
    const totalEl = document.getElementById('cart_total');

    const totalQty = this.items.reduce((s, i) => s + i.qty, 0);
    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? 'flex' : 'none';

    if (this.items.length === 0) {
      itemsEl.innerHTML = '<p class="cart_empty">Tu carrito está vacío.</p>';
      totalEl.textContent = '$0';
      return;
    }

    itemsEl.innerHTML = this.items.map((item, i) => `
      <div class="cart_item" data-index="${i}">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart_item_info">
          <p>${item.name}</p>
          <span>$${(item.price * item.qty).toLocaleString('es-CO')}</span>
        </div>
        <div class="cart_item_qty">
          <button class="cart_qty_btn" data-action="minus" data-index="${i}">−</button>
          <span>${item.qty}</span>
          <button class="cart_qty_btn" data-action="plus" data-index="${i}">+</button>
        </div>
        <button class="cart_item_remove" data-index="${i}">✕</button>
      </div>
    `).join('');

    const total = this.items.reduce((s, i) => s + i.price * i.qty, 0);
    totalEl.textContent = '$' + total.toLocaleString('es-CO');
  },

  open() {
    document.getElementById('cart_drawer').classList.add('open');
    document.getElementById('cart_overlay').classList.add('open');
  },

  close() {
    document.getElementById('cart_drawer').classList.remove('open');
    document.getElementById('cart_overlay').classList.remove('open');
  },

  checkout() {
    if (this.items.length === 0) {
      Toast.show('Tu carrito está vacío', 'info');
      return;
    }
    const lines = this.items.map(i =>
      `• ${i.name} x${i.qty}: $${(i.price * i.qty).toLocaleString('es-CO')}`
    ).join('\n');
    const total = this.items.reduce((s, i) => s + i.price * i.qty, 0);
    const msg = `Hola, me gustaría realizar el siguiente pedido:\n\n${lines}\n\nTotal: $${total.toLocaleString('es-CO')}`;
    window.open(`https://wa.me/573154380079?text=${encodeURIComponent(msg)}`, '_blank');
  }
};
