import { getArtistsList } from './sound-wave-api';
import {
  artistsTemplate,
  updateBtnStatus,
  loadMore,
  hideLoadMore,
} from './render-artists';
import { showLoaderArt, hideLoaderArt } from './render-artists';
loadMore.addEventListener('click', handleLoadMoreBtn);
let currentPage = 1;
let maxPage = null;
const gallery = document.querySelector('.artists-gallery');
showLoaderArt();
hideLoadMore();
getArtistsList(currentPage).then(data => {
  const markup = artistsTemplate(data.artists);
  maxPage = Math.ceil(data.totalArtists / data.limit);
  gallery.insertAdjacentHTML('beforeend', markup);
  hideLoaderArt();
  updateBtnStatus(currentPage, maxPage);
});
function handleLoadMoreBtn() {
  hideLoadMore();
  showLoaderArt();
  currentPage++;
  getArtistsList(currentPage).then(data => {
    const markup = artistsTemplate(data.artists);
    gallery.insertAdjacentHTML('beforeend', markup);

    hideLoaderArt();
    updateBtnStatus(currentPage, maxPage);
  });
}
