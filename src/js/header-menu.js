import spriteUrl from '../public/img/sprite.svg?url';

const menuBackdrop = document.querySelector('.backdrop-header');
const toggleBtn = document.querySelector('.js-toggle-menu');
const iconUse = toggleBtn.querySelector('.menu-icon');

toggleBtn.addEventListener('click', () => {
  const isOpen = menuBackdrop.classList.toggle('is-open');

  iconUse.setAttribute(
    'href',
    isOpen
      ? `${spriteUrl}#icon-header-close-menu`
      : `${spriteUrl}#icon-header-open-menu`
  );
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
      iconUse.setAttribute('href', `${spriteUrl}#icon-header-open-menu`);
      document.body.classList.remove('menu-open');
    }
  });
});
