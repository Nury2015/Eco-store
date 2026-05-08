const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast_container');
  },

  show(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast_${type}`;
    toast.textContent = message;
    this.container.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('toast_visible'));
    });

    setTimeout(() => {
      toast.classList.remove('toast_visible');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 2800);
  }
};
