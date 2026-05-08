const Filters = {
  current: 'all',

  init() {
    document.querySelectorAll('.filter_btn').forEach(btn => {
      btn.addEventListener('click', () => this.apply(btn.dataset.filter));
    });
  },

  apply(filter) {
    this.current = filter;

    document.querySelectorAll('.filter_btn').forEach(btn =>
      btn.classList.toggle('filter_btn_active', btn.dataset.filter === filter)
    );

    const salud = document.querySelector('.section_products');
    const hogar = document.querySelector('.section_hogar');

    salud.style.display = (filter === 'all' || filter === 'salud') ? '' : 'none';
    hogar.style.display = (filter === 'all' || filter === 'hogar') ? '' : 'none';
  }
};
