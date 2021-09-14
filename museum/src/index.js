import './style.css';
import './explore';
import './video';

const form = document.querySelector('.form-wrapper');
const buyNow = document.querySelector('.buy-btn');
const formClose = document.querySelector('.form-close');

buyNow.addEventListener('click', function () {
  form.classList.add('form-visible');
});

formClose.addEventListener('click', function () {
  form.classList.remove('form-visible');
});
