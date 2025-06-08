document.querySelector('.explore-btn').addEventListener('click', () => {
  const targetSection = document.querySelector('#explore');
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
});
