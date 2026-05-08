const Modal = {
  current: null,
  qty: 1,

  open(card) {
    const btn = card.querySelector('.btn_add_cart');
    if (!btn) return;
    const img  = card.querySelector('.imagen_product img');
    const name = card.querySelector('h3').textContent.trim();
    const desc = card.querySelector('p:not(.card_price)').textContent.trim();

    this.current = { name, price: parseInt(btn.dataset.price), image: btn.dataset.image };
    this.qty = 1;

    document.getElementById('modal_img').src         = img.src;
    document.getElementById('modal_img').alt         = name;
    document.getElementById('modal_name').textContent = name;
    document.getElementById('modal_desc').textContent = desc;
    document.getElementById('modal_price').textContent =
      '$' + this.current.price.toLocaleString('es-CO');
    document.getElementById('qty_value').textContent  = 1;

    const addBtn = document.getElementById('modal_add_cart');
    addBtn.textContent = 'Agregar al carrito';
    addBtn.style.backgroundColor = '';

    document.getElementById('modal_overlay').classList.add('open');
  },

  close() {
    document.getElementById('modal_overlay').classList.remove('open');
  },

  changeQty(delta) {
    this.qty = Math.max(1, this.qty + delta);
    document.getElementById('qty_value').textContent = this.qty;
  }
};
