import Swiper, { Autoplay } from 'swiper';
Swiper.use([Autoplay]);

const ticketsSwiper = new Swiper('.tickets-field-img', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    stopOnLastSlide: false,
  },
  simulateTouch: true,
  touchAngle: 45,
  grabCursor: true,
  parallax: true,
});
