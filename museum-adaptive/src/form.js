const form = document.querySelector('.form-wrapper');
const buyNow = document.querySelector('.buy-btn');
const formClose = document.querySelector('.form-close');
const overlay = document.querySelector('.overlay');
const formSelect = document.querySelector('.form-select');
const formDate = document.querySelector('.date');
const formDatePsewdo = document.querySelector('.date-psewdo');
const formTime = document.querySelector('.time');
const formTimePsewdo = document.querySelector('.time-psewdo');

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
formDate.addEventListener('click', () => {
  formDatePsewdo.classList.add('date-psewdo-nonvisible');
});
formDate.addEventListener('blur', () => {
  formDatePsewdo.classList.remove('date-psewdo-nonvisible');
  if (formDate.value) {
    formDatePsewdo.innerHTML = `${formDate.value}`;
  } else formDatePsewdo.innerHTML = `Date`;
});
formTime.addEventListener('click', () => {
  formTimePsewdo.classList.add('time-psewdo-nonvisible');
});
formTime.addEventListener('blur', () => {
  formTimePsewdo.classList.remove('time-psewdo-nonvisible');
  if (formTime.value) {
    formTimePsewdo.innerHTML = `${formTime.value}`;
  } else formTimePsewdo.innerHTML = `Time`;
});
