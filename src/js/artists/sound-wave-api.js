import axios from 'axios';

const BASE_URL = 'https://sound-wave.b.goit.study/api';
const END_POINT = '/artists';

export function getArtistsList(page = 1) {
  const params = {
    limit: 8,
    page,
  };

  return axios
    .get(`${BASE_URL}${END_POINT}`, { params })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.error('Error fetching artists:', error);
      throw error;
    });
}
