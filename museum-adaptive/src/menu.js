const burgerContainer = document.querySelector('.burger-container');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header-nav');

burgerContainer.addEventListener('click', () => {
  burger.classList.toggle('burger-open');
  menu.classList.toggle('header-nav-open');
});
