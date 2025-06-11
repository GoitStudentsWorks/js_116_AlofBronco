export const loadMore = document.querySelector('.load-more-btn');
function artistTemplate({
  _id,
  genres,
  strArtist,
  strBiographyEN,
  strArtistThumb,
}) {
  return `<li class="artists-item">
        <img class="artists-img" src="${strArtistThumb}" alt="${strArtist}" width="288"/>
        <ul class="artists-genres">${genres
          .map(
            genre =>
              `<li class="artists-genres-item"><p class="artists-genres-text">${genre}</p></li>`
          )
          .join('\n')}</ul>
                  <h3 class="artsits-name">${strArtist}</h3>
        <p class="artists-descr">${strBiographyEN}</p>
        <button class="learn-btn" type="button" data-id="${_id}" data-genres="${genres}">Learn More<svg class="learn-more-svg" width="24" height="24">
        <use href="/img/sprite.svg#icon-triangle-right"></use>
      </svg></button>
      </li>`;
}
export function artistsTemplate(artistsList) {
  return artistsList.map(artistTemplate).join('\n');
}
export function showLoadMore() {
  loadMore.classList.remove('hidden');
}
export function hideLoadMore() {
  loadMore.classList.add('hidden');
}
export function updateBtnStatus(currentPage, maxPage) {
  if (currentPage < maxPage) {
    showLoadMore();
    return;
  } else {
    hideLoadMore();
  }
}
