const menuBackdrop = document.querySelector('.backdrop-header');
const toggleBtn = document.querySelector('.js-toggle-menu');
const iconUse = toggleBtn.querySelector('.menu-icon');
const logoUse = document.querySelector('.js-logo-icon use');

const updateLogoIcon = () => {
  const href =
    window.innerWidth >= 768
      ? '/img/header/icons-header.svg#icon-header-logo'
      : '/img/header/icons-header.svg#icon-header-logo-mobile';

  logoUse.setAttribute('href', href);
};

toggleBtn.addEventListener('click', () => {
  const isOpen = menuBackdrop.classList.toggle('is-open');

  iconUse.setAttribute(
    'href',
    isOpen
      ? '/img/header/icons-header.svg#icon-header-close-menu'
      : '/img/header/icons-header.svg#icon-header-open-menu'
  );
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

window.addEventListener('resize', updateLogoIcon);
window.addEventListener('DOMContentLoaded', updateLogoIcon);
