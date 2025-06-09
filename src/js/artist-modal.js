import axios from 'axios';

async function getArtistData(id) {
  const res = await axios.get(
    `https://sound-wave.b.goit.study/api/artists/${id}`
  );

  console.log(res.data);

  return res.data;
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
                      href="/img/artist-modal/close-modal.svg#icon-youtube"
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

async function insertAlbums(artistId) {
  try {
    const data = await getArtistData(artistId);
    const groupedAlbums = groupTracksByAlbums(data);
    const albumsList = document.querySelector('.albums-list');

    if (albumsList) {
      albumsList.insertAdjacentHTML('beforeend', albumsTemplate(groupedAlbums));
    }
  } catch (error) {
    console.error('Error loading artist data:', error);
  }
}

insertAlbums('65ada227af9f6d155db46908');

async function artistDescription(artistId) {
  try {
    const data = await getArtistData(artistId);

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

    document.querySelector('.modal-title').textContent = strArtist;

    return `
    <img
     class="modal-img"
     src="${strArtistThumb}"
     alt="${strArtist}"
   />
   <div class="description-text-wrapper">
     <ul class="artist-description">
       <li class="artist-desc-item">
         <h4 class="artist-desc-title">Years active</h4>
         <p class="artist-desc-text">${intFormedYear} - ${
      intDiedYear ? intDiedYear : 'present'
    }</p>
       </li>
       <li class="artist-desc-item">
         <h4 class="artist-desc-title">Sex</h4>
         <p class="artist-desc-text">${strGender}</p>
       </li>
       <li class="artist-desc-item">
         <h4 class="artist-desc-title">Members</h4>
         <p class="artist-desc-text">${intMembers}</p>
       </li>
       <li class="artist-desc-item">
         <h4 class="artist-desc-title">Country</h4>
         <p class="artist-desc-text">${strCountry}</p>
       </li>
     </ul>
     <div class="artist-biography">
       <h4 class="artist-desc-title">Biography</h4>
       <p class="artist-desc-text">
         ${strBiographyEN}
       </p>
     </div>

     <ul class="artist-genres">
       <li class="artist-genres-item">
         <p class="artist-genres-text">Alternative</p>
       </li>
       <li class="artist-genres-item">
         <p class="artist-genres-text">Pop</p>
       </li>
       <li class="artist-genres-item">
         <p class="artist-genres-text">Rock</p>
       </li>
       <li class="artist-genres-item">
         <p class="artist-genres-text">Indie</p>
       </li>
     </ul>
   </div>
`;
  } catch (error) {
    console.error('Error loading artist data:', error);
    return '<p class="error-text">Failed to load artist info.</p>';
  }
}
const artistDescriptionH = document.querySelector('.description-wrapper');
async function renderArtistDescription() {
  const html = await artistDescription('65ada227af9f6d155db46908');
  artistDescriptionH.insertAdjacentHTML('beforeend', html);
}

renderArtistDescription();

async function getArtistGenres(id = '65ada227af9f6d155db46908') {
  const res = await axios.get(`https://sound-wave.b.goit.study/api/genres/`);
  console.log(res.data);
}

getArtistGenres();
