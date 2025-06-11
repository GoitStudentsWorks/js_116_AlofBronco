const menuBackdrop = document.querySelector('.backdrop-header');
const toggleBtn = document.querySelector('.js-toggle-menu');
const iconUse = toggleBtn.querySelector('.menu-icon');
const logoUse = document.querySelector('.js-logo-icon use');

const updateLogoIcon = () => {
  const href =
    window.innerWidth >= 768
      ? '/img/sprite.svg#icon-header-logo'
      : '/img/sprite.svg#icon-header-logo-mobile';

  logoUse.setAttribute('href', href);
};

toggleBtn.addEventListener('click', () => {
  const isOpen = menuBackdrop.classList.toggle('is-open');

  iconUse.setAttribute(
    'href',
    isOpen
      ? '/img/sprite.svg#icon-header-close-menu'
      : '/img/sprite.svg#icon-header-open-menu'
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
      iconUse.setAttribute('href', '/img/sprite.svg#icon-header-open-menu');
      document.body.classList.remove('menu-open');
    }
  });
});

const adjustSectionOffset = () => {
  const header = document.querySelector('.header');
  const firstSection = document.querySelector('.section');
  if (header && firstSection) {
    const headerHeight = header.offsetHeight;
    firstSection.style.marginTop = `${headerHeight}px`;
  }
};

window.addEventListener('resize', () => {
  updateLogoIcon();
  adjustSectionOffset();
});

window.addEventListener('DOMContentLoaded', () => {
  updateLogoIcon();
  adjustSectionOffset();
});
