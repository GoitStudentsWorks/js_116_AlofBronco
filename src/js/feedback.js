import axios from 'axios';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '@fortawesome/fontawesome-free/css/all.min.css';

const wrapper = document.getElementById('feedback-wrapper');
const paginationContainer = document.getElementById('pagination');
let swiperInstance;

// запит на сервер

async function fetchFeedbacks() {
  try {
    const response = await axios.get(
      'https://sound-wave.b.goit.study/api/feedbacks',
      {
        params: {
          limit: 3,
          page: 1,
        },
      }
    );
    let feedbacks = response.data.data;
    console.log(feedbacks); // srawdzian

    if (!feedbacks || feedbacks.length === 0) {
      ('No feedback find');
    }

    console.log(renderFeedbacks(feedbacks));
    initSwiper();
    // initSwiperButtoms();
  } catch (err) {
    console.error('Feedback loading error', err);
  }
}

// рендер
function renderFeedbacks(feedbacks) {
  wrapper.innerHTML = '';

  feedbacks.forEach(fb => {
    const roundedRating = Math.round(fb.rating);
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
            <div class="rating">
                ${generateStarRating(roundedRating)}
            </div>
            <div class="text">"${fb.descr}"</div>
            <div class="user">${fb.name}</div>
        `;
    wrapper.appendChild(slide);
  });
}

//  генерації зірочок
function generateStarRating(rating) {
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHtml += '<i class="fas fa-star star"></i>';
    } else {
      starsHtml += '<i class="fas fa-star star-empty"></i>';
    }
  }
  return starsHtml;
}

//  Swiper
function initSwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    autoHeight: true,
    speed: 700,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    on: {
      slideChange: updatePagination,
      init: updatePagination,
    },
  });
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  });
  document.getElementById('nextBtn').addEventListener('click', () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  });

  createPaginationDots(3);
  updatePagination();
}

//точки і їх функціонал

function createPaginationDots(totalDots) {
  paginationContainer.innerHTML = '';

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('span');
    dot.id = `pag-${i}`;
    dot.classList.add('pagination-dot');
    dot.addEventListener('click', () => {
      if (swiperInstance) {
        swiperInstance.slideToLoop(i);
      }
    });
    paginationContainer.appendChild(dot);
  }
}

function updatePagination() {
  if (!swiperInstance || swiperInstance.slides.length === 0) {
    return;
  }
  const activeIndex = swiperInstance.realIndex;

  document.querySelectorAll('.pagination span').forEach((span, index) => {
    span.classList.remove('active');
    if (index === activeIndex) {
      span.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', fetchFeedbacks);
