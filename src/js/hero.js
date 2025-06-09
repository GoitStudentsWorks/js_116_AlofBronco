export function setupExploreScroll() {
  const exploreBtn = document.querySelector('.explore-btn');

  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const targetSection = document.querySelector('#explore');
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }
}
