const burgerContainer = document.querySelector('.burger-container');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header-nav-container');
const welcomeTextContainer = document.querySelector('.welcome-text-container');
const menuLinks = document.querySelectorAll('.nav-item-link');

burgerContainer.addEventListener('click', () => {
  burger.classList.toggle('burger-open');
  menu.classList.toggle('header-nav-open');
  welcomeTextContainer.classList.toggle('opacity-zero');
});

menuLinks.forEach((el) =>
  el.addEventListener('click', () => {
    burger.classList.remove('burger-open');
    menu.classList.remove('header-nav-open');
    welcomeTextContainer.classList.remove('opacity-zero');
  })
);
document.addEventListener('click', (event) => {
  if (event.target != burger) {
    if (event.target.className != 'header-nav-container header-nav-open' && event.target.className != 'header-nav' && event.target.className != 'nav-item' && event.target.className != 'nav-image' && event.target.className != 'nav-images-container nav-images-container-visible' && event.target.className != 'socials-container' && event.target.className != 'socials') {
      burger.classList.remove('burger-open');
      menu.classList.remove('header-nav-open');
      welcomeTextContainer.classList.remove('opacity-zero');
    }
  }
});
