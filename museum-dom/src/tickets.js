const ticketBasic = document.querySelector('.ticket-number-basic');
const ticketSenior = document.querySelector('.ticket-number-senior');
const radioButtons = document.getElementsByName('ticket-type');
const ticketAmountChangeButtons = document.querySelectorAll('.ticket-amout-change');
let totalCost = document.querySelector('.total-cost');
let radioId = 'ticket-radio-1';
const prices = {
  'ticket-radio-1': 20,
  'ticket-radio-2': 25,
  'ticket-radio-3': 40,
};

const setTicketType = (type) => {
  radioButtons.forEach((radio) => {
    if (radio.id === type) {
      radio.checked = true;
    }
  });
};
const calcCost = (type) => ticketBasic.value * prices[type] + (ticketSenior.value * prices[type]) / 2;

window.addEventListener('DOMContentLoaded', () => {
  totalCost.textContent = calcCost(radioId);
});

radioButtons.forEach((radio) => {
  radio.addEventListener('click', () => {
    radioId = radio.id;
    totalCost.textContent = calcCost(radioId);
  });
});

ticketBasic.addEventListener('input', () => {
  totalCost.textContent = calcCost(radioId);
});

ticketSenior.addEventListener('input', () => {
  totalCost.textContent = calcCost(radioId);
});

ticketAmountChangeButtons.forEach((el) => {
  el.addEventListener('click', () => {
    totalCost.textContent = calcCost(radioId);
  });
});

function setLocalStorage() {
  localStorage.setItem('ticketBasic', ticketBasic.value);
  localStorage.setItem('ticketSenior', ticketSenior.value);
  localStorage.setItem('radioId', radioId);
  localStorage.setItem('totalCost', totalCost.textContent);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('ticketBasic')) ticketBasic.value = localStorage.getItem('ticketBasic');
  if (localStorage.getItem('ticketSenior')) ticketSenior.value = localStorage.getItem('ticketSenior');
  if (localStorage.getItem('radioId')) radioId = localStorage.getItem('radioId');
  if (localStorage.getItem('totalCost')) totalCost.textContent = localStorage.getItem('totalCost');
}

window.addEventListener('load', () => {
  getLocalStorage();
  setTicketType(radioId);
});
