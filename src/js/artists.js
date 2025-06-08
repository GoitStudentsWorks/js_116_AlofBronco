import { getArtistsList } from './sound-wave-api';
import {
  artistsTemplate,
  showLoadMore,
  hideLoadMore,
  updateBtnStatus,
  loadMore,
} from './render-artists';
loadMore.addEventListener('click', handleLoadMoreBtn);
let currentPage = 1;
let maxPage = 1;
const gallery = document.querySelector('.artists-gallery');
getArtistsList(currentPage).then(data => {
  const markup = artistsTemplate(data.artists);
  maxPage = Math.ceil(data.totalArtists / data.limit);
  gallery.insertAdjacentHTML('beforeend', markup);

  updateBtnStatus(currentPage, maxPage);
});
function handleLoadMoreBtn() {
  currentPage++;
  getArtistsList(currentPage).then(data => {
    const markup = artistsTemplate(data.artists);
    gallery.insertAdjacentHTML('beforeend', markup);
    updateBtnStatus(currentPage, maxPage);
  });
}
