import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

const welcomeSwiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  simulateTouch: true,
  touchAngle: 45,
  grabCursor: true,
});

const currentSlideNumber = document.querySelector('.current-bullet');
const sliderWrapper = document.querySelector('.swiper-wrapper');

sliderWrapper.addEventListener('transitionend', () => {
  let number = welcomeSwiper.activeIndex;
  if (number === 6) {
    number = 1;
  } else if (number === 0) {
    number = 5;
  }
  currentSlideNumber.textContent = `${number}`;
});

currentSlideNumber.textContent = `${welcomeSwiper.activeIndex}`;
