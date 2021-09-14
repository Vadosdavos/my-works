const form = document.querySelector('.form-wrapper');
const buyNow = document.querySelector('.buy-btn');
const formClose = document.querySelector('.form-close');
const overlay = document.querySelector('.overlay');
const formSelect = document.querySelector('.form-select');

buyNow.addEventListener('click', function () {
  form.classList.add('form-visible');
  overlay.classList.add('overlay-visible');
});
formClose.addEventListener('click', function () {
  form.classList.remove('form-visible');
  overlay.classList.remove('overlay-visible');
});
overlay.addEventListener('click', function () {
  form.classList.remove('form-visible');
  overlay.classList.remove('overlay-visible');
});
formSelect.addEventListener('click', function () {
  formSelect.classList.toggle('form-select-active');
});
