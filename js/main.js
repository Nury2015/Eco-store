document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
  Cart.load();
  Wishlist.load();
  Filters.init();
  initAnimations();

  // Nav — carrito
  document.getElementById('cart_btn').addEventListener('click', () => Cart.open());
  document.getElementById('cart_close').addEventListener('click', () => Cart.close());
  document.getElementById('cart_overlay').addEventListener('click', () => Cart.close());
  document.querySelector('.cart_checkout').addEventListener('click', () => Cart.checkout());

  // Carrito — cantidad y eliminar (event delegation)
  document.getElementById('cart_items').addEventListener('click', e => {
    const qtyBtn    = e.target.closest('.cart_qty_btn');
    const removeBtn = e.target.closest('.cart_item_remove');
    if (qtyBtn)    Cart.updateQty(parseInt(qtyBtn.dataset.index), qtyBtn.dataset.action === 'plus' ? 1 : -1);
    if (removeBtn) Cart.remove(parseInt(removeBtn.dataset.index));
  });

  // Botón "Agregar al carrito" en cada card
  document.querySelectorAll('.btn_add_cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      Cart.add({ name: btn.dataset.name, price: parseInt(btn.dataset.price), image: btn.dataset.image });
      const orig = btn.textContent;
      btn.textContent = '✓ Agregado';
      btn.style.backgroundColor = '#5a8a3c';
      setTimeout(() => { btn.textContent = orig; btn.style.backgroundColor = ''; }, 1200);
    });
  });

  // Corazones / wishlist
  document.querySelectorAll('.heart').forEach(heart => {
    heart.addEventListener('click', e => {
      e.stopPropagation();
      const name = heart.closest('.card').querySelector('h3').textContent.trim();
      Wishlist.toggle(name);
    });
  });

  // Modal de producto
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.btn_add_cart') || e.target.closest('.heart')) return;
      Modal.open(card);
    });
  });

  document.getElementById('modal_close').addEventListener('click', () => Modal.close());
  document.getElementById('modal_overlay').addEventListener('click', e => {
    if (e.target.id === 'modal_overlay') Modal.close();
  });
  document.getElementById('qty_minus').addEventListener('click', () => Modal.changeQty(-1));
  document.getElementById('qty_plus').addEventListener('click', () => Modal.changeQty(1));
  document.getElementById('modal_add_cart').addEventListener('click', () => {
    if (!Modal.current) return;
    Cart.add(Modal.current, Modal.qty);
    const btn = document.getElementById('modal_add_cart');
    btn.textContent = '✓ Agregado';
    btn.style.backgroundColor = '#5a8a3c';
    setTimeout(() => Modal.close(), 900);
  });

  // "Conoce más" — scroll a productos
  document.querySelector('.main_article')?.addEventListener('click', () => {
    document.querySelector('.filters')?.scrollIntoView({ behavior: 'smooth' });
  });

  // "Ver catálogo" en CTA
  document.querySelector('.cta_button')?.addEventListener('click', () => {
    document.querySelector('.section_products')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Scroll inicial al centro de la primera sección de cards
  window.addEventListener('load', () => {
    const container = document.querySelector('.cards_section');
    if (!container) return;
    const cards = container.querySelectorAll('.card');
    if (!cards.length) return;
    const mid = cards[Math.floor(cards.length / 2)];
    container.scrollTo({
      left: mid.offsetLeft - container.clientWidth / 2 + mid.clientWidth / 2,
      behavior: 'smooth'
    });
  });
});
