import { formDate } from './form';
import { formTime } from './form';
const ticketBasic = document.querySelector('.ticket-number-basic');
const ticketSenior = document.querySelector('.ticket-number-senior');
const ticketBasicForm = document.querySelector('.ticket-number-basic-form');
const ticketSeniorForm = document.querySelector('.ticket-number-senior-form');
const ticketOverviewBasic = document.querySelector('.ticket-overview-basic');
const ticketOverviewSenior = document.querySelector('.ticket-overview-senior');
const overviewCostBasic = document.querySelector('.overview-cost-basic');
const overviewCostSenior = document.querySelector('.overview-cost-senior');
const radioButtons = document.getElementsByName('ticket-type');
const ticketAmountChangeButtons = document.querySelectorAll('.ticket-amout-change');
const totalCost = document.querySelector('.total-cost');
const totalCostForm = document.querySelector('.total-cost-form');
const formSelect = document.querySelector('.form-select');
const formSelectOptions = Array.from(formSelect.options);
const basicPrice = document.querySelectorAll('.basic-price');
const seniorPrice = document.querySelectorAll('.senior-price');
const overviewTicketType = document.querySelector('.overview-ticket-type');
const overviewDate = document.querySelector('.overview-date');
const overviewTime = document.querySelector('.overview-time');
let radioId = 'ticket-radio-1';
const prices = {
  'ticket-radio-1': 20,
  'ticket-radio-2': 25,
  'ticket-radio-3': 40,
};
const selectOptionsTable = {
  'ticket-radio-1': 1,
  'ticket-radio-2': 2,
  'ticket-radio-3': 3,
};

const setTicketType = (type) => {
  radioButtons.forEach((radio) => {
    if (radio.id === type) {
      radio.checked = true;
    }
  });
};
const updateBasicPrise = (type) => {
  basicPrice.forEach((el) => {
    el.textContent = prices[type];
  });
};
const updateSeniorPrise = (type) => {
  seniorPrice.forEach((el) => {
    el.textContent = prices[type] / 2;
  });
};
const calcCost = (type) => ticketBasic.value * prices[type] + (ticketSenior.value * prices[type]) / 2;
const calcCostForm = (type) => ticketBasicForm.value * prices[type] + (ticketSeniorForm.value * prices[type]) / 2;
const calcCostOverviewBasic = (type) => ticketBasicForm.value * prices[type];
const calcCostOverviewSenior = (type) => (ticketSeniorForm.value * prices[type]) / 2;

const validateDate = () => {
  let todayDate = new Date();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  formDate.min = todayDate.toLocaleString('ru-RU', options).replace(/\./g, '-').split('-').reverse().join('-');
};
validateDate();

window.addEventListener('DOMContentLoaded', () => {
  totalCost.textContent = calcCost(radioId);
  totalCostForm.textContent = calcCostForm(radioId);
  overviewCostBasic.textContent = calcCostOverviewBasic(radioId);
  overviewCostSenior.textContent = calcCostOverviewSenior(radioId);
});

formSelectOptions.forEach((option) => {
  option.addEventListener('click', () => {
    radioButtons[option.index - 1].checked = true;
    radioId = radioButtons[option.index - 1].id;
    totalCost.textContent = calcCost(radioId);
    totalCostForm.textContent = calcCostForm(radioId);
    updateBasicPrise(radioId);
    updateSeniorPrise(radioId);
    overviewTicketType.textContent = option.textContent;
  });
});

radioButtons.forEach((radio) => {
  radio.addEventListener('click', () => {
    radioId = radio.id;
    totalCost.textContent = calcCost(radioId);
    totalCostForm.textContent = calcCostForm(radioId);
    formSelectOptions[selectOptionsTable[radioId]].selected = true;
    updateBasicPrise(radioId);
    updateSeniorPrise(radioId);
    overviewTicketType.textContent = formSelectOptions[selectOptionsTable[radioId]].textContent;
  });
});

ticketBasic.addEventListener('input', () => {
  ticketOverviewBasic.textContent = ticketBasic.value;
  ticketBasicForm.value = ticketBasic.value;
  totalCost.textContent = calcCost(radioId);
  totalCostForm.textContent = calcCostForm(radioId);
  overviewCostBasic.textContent = calcCostOverviewBasic(radioId);
});

ticketSenior.addEventListener('input', () => {
  ticketOverviewSenior.textContent = ticketSenior.value;
  ticketSeniorForm.value = ticketSenior.value;
  totalCost.textContent = calcCost(radioId);
  totalCostForm.textContent = calcCostForm(radioId);
  overviewCostSenior.textContent = calcCostOverviewSenior(radioId);
});

ticketBasicForm.addEventListener('input', () => {
  ticketBasic.value = ticketBasicForm.value;
  totalCost.textContent = calcCost(radioId);
  totalCostForm.textContent = calcCostForm(radioId);
  ticketOverviewBasic.textContent = ticketBasicForm.value;
  overviewCostBasic.textContent = calcCostOverviewBasic(radioId);
});

ticketSeniorForm.addEventListener('input', () => {
  ticketSenior.value = ticketSeniorForm.value;
  totalCost.textContent = calcCost(radioId);
  totalCostForm.textContent = calcCostForm(radioId);
  ticketOverviewSenior.textContent = ticketSeniorForm.value;
  overviewCostSenior.textContent = calcCostOverviewSenior(radioId);
});

ticketAmountChangeButtons.forEach((el) => {
  el.addEventListener('click', () => {
    if (el.classList.contains('form-plus')) {
      if (el.previousElementSibling === ticketBasicForm) {
        ticketBasic.value = el.previousElementSibling.value;
      } else ticketSenior.value = el.previousElementSibling.value;
    } else if (el.classList.contains('form-minus')) {
      if (el.nextElementSibling === ticketBasicForm) {
        ticketBasic.value = el.nextElementSibling.value;
      } else ticketSenior.value = el.nextElementSibling.value;
    } else if (el.classList.contains('plus')) {
      if (el.previousElementSibling === ticketBasic) {
        ticketBasicForm.value = el.previousElementSibling.value;
      } else ticketSeniorForm.value = el.previousElementSibling.value;
    } else if (el.classList.contains('minus')) {
      if (el.nextElementSibling === ticketBasic) {
        ticketBasicForm.value = el.nextElementSibling.value;
      } else ticketSeniorForm.value = el.nextElementSibling.value;
    }
    totalCost.textContent = calcCost(radioId);
    totalCostForm.textContent = calcCostForm(radioId);
    ticketOverviewBasic.textContent = ticketBasicForm.value;
    ticketOverviewSenior.textContent = ticketSeniorForm.value;
    overviewCostBasic.textContent = calcCostOverviewBasic(radioId);
    overviewCostSenior.textContent = calcCostOverviewSenior(radioId);
  });
});

formDate.addEventListener('input', () => {
  let date = new Date(formDate.value);
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  overviewDate.textContent = date.toLocaleString('en-US', options);
});

formTime.addEventListener('input', () => {
  overviewTime.textContent = formTime.value;
});

const setLocalStorage = () => {
  localStorage.setItem('ticketBasic', ticketBasic.value);
  localStorage.setItem('ticketSenior', ticketSenior.value);
  localStorage.setItem('radioId', radioId);
  localStorage.setItem('totalCost', totalCost.textContent);
  localStorage.setItem('overviewCostBasic', overviewCostBasic.textContent);
  localStorage.setItem('overviewCostSenior', overviewCostSenior.textContent);
  localStorage.setItem('overviewTicketType', overviewTicketType.textContent);
};
window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem('ticketBasic')) {
    ticketBasic.value = localStorage.getItem('ticketBasic');
    ticketBasicForm.value = localStorage.getItem('ticketBasic');
    ticketOverviewBasic.textContent = localStorage.getItem('ticketBasic');
  }
  if (localStorage.getItem('ticketSenior')) {
    ticketSenior.value = localStorage.getItem('ticketSenior');
    ticketSeniorForm.value = localStorage.getItem('ticketSenior');
    ticketOverviewSenior.textContent = localStorage.getItem('ticketSenior');
  }
  if (localStorage.getItem('radioId')) radioId = localStorage.getItem('radioId');
  if (localStorage.getItem('totalCost')) {
    totalCost.textContent = localStorage.getItem('totalCost');
    totalCostForm.textContent = localStorage.getItem('totalCost');
  }
  if (localStorage.getItem('overviewCostBasic')) overviewCostBasic.textContent = localStorage.getItem('overviewCostBasic');
  if (localStorage.getItem('overviewCostSenior')) overviewCostSenior.textContent = localStorage.getItem('overviewCostSenior');
  if (localStorage.getItem('overviewTicketType')) overviewTicketType.textContent = localStorage.getItem('overviewTicketType');
};

window.addEventListener('load', () => {
  getLocalStorage();
  setTicketType(radioId);
  formSelect.options[selectOptionsTable[radioId]].selected = true;
  updateBasicPrise(radioId);
  updateSeniorPrise(radioId);
});
