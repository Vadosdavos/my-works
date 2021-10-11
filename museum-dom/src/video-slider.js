import Swiper, { Navigation, Pagination } from 'swiper';
import { video } from './video';
import { play } from './video';
import { playBig } from './video';
Swiper.use([Navigation, Pagination]);

const videoSwiper = new Swiper('.video-playlist', {
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.pag-video',
    clickable: true,
  },
  navigation: {
    nextEl: '.next-video',
    prevEl: '.prev-video',
  },
  slidesPerView: 3,
  spaceBetween: 42,
});

const vidioSliderWrapper = document.querySelector('.video-playlist .swiper-wrapper');

vidioSliderWrapper.addEventListener('transitionend', () => {
  let number = videoSwiper.activeIndex - 3;
  if (number === 5) {
    number = 0;
  } else if (number === -1) {
    number = 4;
  }
  video.src = `./assets/video/video${number}.webm`;
  video.poster = `./assets/video/poster${number}.jpg`;
  playBig.classList.remove('play-big-hidden');
  play.classList.remove('stop');
});
