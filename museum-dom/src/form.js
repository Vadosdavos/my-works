const form = document.querySelector('.form-wrapper');
const buyNow = document.querySelector('.buy-btn');
const formClose = document.querySelector('.form-close');
const overlay = document.querySelector('.overlay');
const formSelect = document.querySelector('.form-select');
export const formDate = document.querySelector('.date');
const formDatePsewdo = document.querySelector('.date-psewdo');
export const formTime = document.querySelector('.time');
const formTimePsewdo = document.querySelector('.time-psewdo');
const formNameInput = document.querySelector('.form-input.text');
const formEmailInput = document.getElementById('email');
const formTelInput = document.getElementById('tel');
const invalidText = document.querySelector('.invalid-text');
const submitButton = document.querySelector('.ripple-target');

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
  if (!formDate.value) {
    formDatePsewdo.classList.remove('date-psewdo-nonvisible');
  }
});
formTime.addEventListener('click', () => {
  formTimePsewdo.classList.add('time-psewdo-nonvisible');
});
formTime.addEventListener('blur', () => {
  if (!formTime.value) {
    formTimePsewdo.classList.remove('time-psewdo-nonvisible');
  }
});

const setInvalid = function () {
  this.nextElementSibling.style = 'display: block';
  this.style = 'outline: 2px solid red';
  submitButton.setAttribute('disabled', 'disabled');
};

const removeInvalid = function () {
  this.nextElementSibling.style = 'display: none';
  this.style = 'outline: none';
  submitButton.removeAttribute('disabled', 'disabled');
};

formNameInput.addEventListener('input', () => {
  let reg = /^[А-Яа-яA-Za-z\s]+$/;
  let name = formNameInput.value;
  if (name.length < 3 || name.length > 15 || !reg.test(name)) {
    setInvalid.apply(formNameInput);
  } else {
    removeInvalid.apply(formNameInput);
  }
});

formEmailInput.addEventListener('input', () => {
  let reg = /^[a-zA-Z0-9_.+-]{3,15}@[a-zA-Z0-9-]{4,15}\.[a-zA-Z0-9-.]{2,10}$/;
  let email = formEmailInput.value;
  if (email.length < 3 || email.length > 15 || !formEmailInput.validity.valid || !reg.test(email)) {
    setInvalid.apply(formEmailInput);
  } else {
    removeInvalid.apply(formEmailInput);
  }
});

formTelInput.addEventListener('input', () => {
  let reg = /^[(\d{2,3}([-\d{2,3}\-)+\d{2,3})\d]+[^-]$/g;
  let regNumbers = /\d/g;
  let tel = formTelInput.value;
  const digits = tel.match(regNumbers);
  if (!reg.test(tel) || digits.length > 10) {
    setInvalid.apply(formTelInput);
  } else {
    removeInvalid.apply(formTelInput);
  }
});
