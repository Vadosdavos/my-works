const burger = document.querySelector('.burger');
const menu = document.querySelector('.header-nav');

burger.addEventListener('click', (event) => {
  burger.classList.toggle('burger-open');
  menu.classList.toggle('header-nav-open');
});
