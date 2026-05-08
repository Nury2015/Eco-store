const Wishlist = {
  items: new Set(),

  load() {
    try {
      const saved = localStorage.getItem('eco_wishlist');
      if (saved) this.items = new Set(JSON.parse(saved));
    } catch (_) {
      this.items = new Set();
    }
    this.render();
  },

  save() {
    localStorage.setItem('eco_wishlist', JSON.stringify([...this.items]));
  },

  toggle(name) {
    if (this.items.has(name)) {
      this.items.delete(name);
      Toast.show(`${name} eliminado de favoritos`, 'info');
    } else {
      this.items.add(name);
      Toast.show(`${name} guardado en favoritos`, 'info');
    }
    this.save();
    this.render();
  },

  render() {
    document.querySelectorAll('.heart').forEach(heart => {
      const name = heart.closest('.card')?.querySelector('h3')?.textContent.trim();
      if (name) heart.classList.toggle('heart_active', this.items.has(name));
    });

    const badge = document.getElementById('wishlist_count');
    if (badge) {
      badge.textContent = this.items.size;
      badge.style.display = this.items.size > 0 ? 'flex' : 'none';
    }
  }
};
