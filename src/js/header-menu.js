const menuBackdrop = document.querySelector('.backdrop-header');
const toggleBtn = document.querySelector('.js-toggle-menu');

toggleBtn.addEventListener('click', () => {
  const isOpen = menuBackdrop.classList.toggle('is-open');
  document.body.classList.toggle('menu-open', isOpen);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const header = document.querySelector('.header');
      const headerHeight = header.offsetHeight;

      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    if (menuBackdrop.classList.contains('is-open')) {
      menuBackdrop.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });
});
