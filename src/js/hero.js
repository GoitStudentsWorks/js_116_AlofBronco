function setupExploreScroll() {
  const exploreBtn = document.querySelector('#btn');

  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const targetSection = document.querySelector('#artists');
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupExploreScroll();
});
