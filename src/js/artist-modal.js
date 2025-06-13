import axios from 'axios';

const descContainer = document.querySelector('.description-wrapper');
const modalTitle = document.querySelector('.modal-title');
const albumsList = document.querySelector('.albums-list');
const loader = document.querySelector('.loader');
const artistsGallery = document.querySelector('.artists-gallery');
const backdrop = document.querySelector('.backdrop');
const modalCloseBtn = document.querySelector('.modal-close-button');
const albumsTitle = document.querySelector('.albums-title');

let genresList;

function showLoader() {
  loader.classList.remove('visually-hidden');
}

function hideLoader() {
  loader.classList.add('visually-hidden');
}

async function getArtistData(id) {
  const res = await axios.get(
    `https://sound-wave.b.goit.study/api/artists/${id}`
  );

  return res.data;
}

async function loadArtist(artistId) {
  descContainer.innerHTML = '';
  albumsList.innerHTML = '';
  modalTitle.innerHTML = '';
  albumsTitle.innerHTML = '';
  showLoader();
  try {
    const data = await getArtistData(artistId);

    albumsTitle.innerHTML = 'Albums';

    modalCloseBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModalBackdrop);
    document.addEventListener('keydown', closeEscModal);

    insertAlbums(data);
    renderArtistDescription(data);
  } catch (error) {
    console.error('Error loading artist data:', error);
  } finally {
    hideLoader();
  }
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function trackTemplate({ strTrack, intDuration, movie }) {
  return `
<li class="tracks-item">
              <p class="track-name">${strTrack}</p>
              <p class="track-length">${formatDuration(intDuration)}</p>
              <div class="track-link-space">
                ${
                  movie
                    ? `<a class="track-link" href='${movie}' target="_blank" rel="noopener noreferrer"
                  ><svg class="track-link-icon" width="24" height="24">
                    <use
                      href="./img/sprite.svg#icon-youtube"
                    ></use></svg
                ></a>`
                    : ''
                } 
              </div>
            </li>
    `;
}

function tracksTemplate(tracks) {
  return tracks.map(trackTemplate).join('');
}

function groupTracksByAlbums({ tracksList }) {
  const albumGroups = {};

  const tracksToProcess = Math.min(100, tracksList.length);

  for (let i = 0; i < tracksToProcess; i++) {
    const track = tracksList[i];
    const albumName = track.strAlbum;

    if (!albumGroups[albumName]) {
      albumGroups[albumName] = [];
    }

    albumGroups[albumName].push(track);
  }

  return albumGroups;
}

function albumTemplate(albumName, groupedAlbums) {
  return `
        <li class="albums-item">
          <h5 class="album-title">${albumName}</h5>
          <div class="tracks-heading">
            <p class="tracks-heading-text">Track</p>
            <p class="tracks-heading-text">Time</p>
            <p class="tracks-heading-text">Link</p>
          </div>
          <ul class="tracks">
          ${tracksTemplate(groupedAlbums[albumName])}
          </ul>
        </li>
    `;
}

function albumsTemplate(groupedAlbums) {
  return Object.keys(groupedAlbums)
    .map(albumName => albumTemplate(albumName, groupedAlbums))
    .join('');
}

function insertAlbums(data) {
  const groupedAlbums = groupTracksByAlbums(data);

  if (albumsList) {
    albumsList.insertAdjacentHTML('beforeend', albumsTemplate(groupedAlbums));
  }
}

function artistInfoItem(title, value) {
  return `
    <li class="artist-desc-item">
      <h4 class="artist-desc-title">${title}</h4>
      <p class="artist-desc-text">${value}</p>
    </li>
  `;
}

function genreItem(genre) {
  return `
    <li class="artist-genres-item">
      <p class="artist-genres-text">${genre}</p>
    </li>
  `;
}

function artistDescription(data) {
  const {
    intDiedYear,
    intFormedYear,
    intMembers,
    strArtist,
    strArtistThumb,
    strBiographyEN,
    strCountry,
    strGender,
  } = data;

  if (modalTitle) modalTitle.textContent = strArtist;

  const genres = genresList;

  return `
      <img class="modal-img" src="${strArtistThumb}" alt="${strArtist}" />
      <div class="description-text-wrapper">
        <ul class="artist-description">
          ${artistInfoItem(
            'Years active',
            `${intFormedYear} - ${intDiedYear || 'present'}`
          )}
          ${artistInfoItem('Sex', strGender)}
          ${artistInfoItem('Members', intMembers)}
          ${artistInfoItem('Country', strCountry)}
        </ul>
        <div class="artist-biography">
          <h4 class="artist-desc-title">Biography</h4>
          <p class="artist-desc-text">${strBiographyEN}</p>
        </div>
        <ul class="artist-genres">
          ${genres.map(genreItem).join('')}
        </ul>
      </div>
    `;
}

function renderArtistDescription(data) {
  if (descContainer) {
    descContainer.insertAdjacentHTML('beforeend', artistDescription(data));
  }
}

artistsGallery.addEventListener('click', e => {
  const button = e.target.closest('button');
  if (!button) return;

  backdrop.classList.add('is-open');
  document.body.style.overflowY = 'hidden';

  genresList = button.dataset.genres.split(',');

  loadArtist(button.dataset.id);
});

function closeModal() {
  backdrop.classList.remove('is-open');
  document.body.style.overflowY = 'auto';

  modalCloseBtn.removeEventListener('click', closeModal);
  backdrop.removeEventListener('click', closeModalBackdrop);
  document.removeEventListener('keydown', closeEscModal);
}

function closeModalBackdrop(e) {
  if (e.target === backdrop) {
    closeModal();
  }
}

function closeEscModal(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}
