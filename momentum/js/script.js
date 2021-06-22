const timeContainer = document.querySelector('.time');
const dateContainer = document.querySelector('.date');
const greetingContainer = document.querySelector('.greeting');
const nameContainer = document.querySelector('.name');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const changeQuoteButton = document.querySelector('.change-quote');

changeQuoteButton.addEventListener('click', () => {
    changeQuoteButton.classList.toggle('rotate');
});

let randomNum;

function showDate () {
    const day = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    dateContainer.textContent = day.toLocaleDateString('en-US', options);
}

function showTime () {
    const date = new Date();
    timeContainer.textContent = date.toLocaleTimeString();
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function getHours() {
    const date = new Date();
    const hours = date.getHours();
    return hours;    
}

function getTimeOfDay() {
    if (getHours() >= 6 && getHours() < 12) return 'morning';
    else if (getHours() >= 12 && getHours() < 18) return 'day';
    else if (getHours() >= 18 && getHours() < 24) return 'evening';
    else if (getHours() >= 0 && getHours() < 6) return 'night';
}
function showGreeting() {    
greetingContainer.textContent = `Good ${getTimeOfDay()}`;
}

function setLocalStorage() {
    localStorage.setItem('userName', nameContainer.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('userName')) nameContainer.value = localStorage.getItem('userName');
}
window.addEventListener('load', getLocalStorage);

function getRandomNum() {
    randomNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    return randomNum; 
}
function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = String(randomNum).padStart(2, '0');
    const img = new Image();
    img.src = `assets/img/${timeOfDay}/${bgNum}.jpg`;
    img.addEventListener('load', () => body.style.backgroundImage = `url(${img.src})`);
}

function getSlideNext() {
    randomNum += 1;
    if (randomNum === 21) randomNum = 1;
    setBg();
}
function getSlidePrev() {
    randomNum -= 1;
    if (randomNum === 1) randomNum = 20;
    setBg();
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=d2330da0be102c4023a469490ba496c9&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
}

city.addEventListener('change', getWeather);

getRandomNum();
showTime();
setBg();
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);