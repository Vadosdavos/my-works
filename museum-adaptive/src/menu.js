const burgerContainer = document.querySelector('.burger-container');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header-nav-container');
const welcomeTextContainer = document.querySelector('.welcome-text-container');

burgerContainer.addEventListener('click', () => {
  burger.classList.toggle('burger-open');
  menu.classList.toggle('header-nav-open');
  welcomeTextContainer.classList.toggle('opacity-zero');
});
