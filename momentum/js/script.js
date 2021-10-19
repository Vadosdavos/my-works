import playList from './playList.js';
import { greetingTranslation, endings } from './objects.js';

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
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const changeQuoteButton = document.querySelector('.change-quote');
const playButton = document.querySelector('.play-main');
const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');
const playListField = document.querySelector('.play-list');
const audio = new Audio();
let isPlay = false;
let playNum = 0;
createSong();
const tracks = playListField.querySelectorAll('.song-name');
const playlistPlayButtons = playListField.querySelectorAll('.playlist-play');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
let lang = 'ru';
const audioLenght = document.querySelector('.audio-lenght');
const audioVolume = document.querySelector('.volume');

function setPlaceholders() {
  if (lang === 'ru') {
    city.placeholder = '[Введите город]';
    nameContainer.placeholder = '[Введите имя]';
  } else {
    city.placeholder = '[Enter city]';
    nameContainer.placeholder = '[Enter name]';
  }
}

function createSong() {
  playList.forEach((el) => {
    const song = document.createElement('li');
    const songName = document.createElement('span');
    const playIcon = document.createElement('button');
    playIcon.className = `play player-icon playlist-play`;
    playIcon.id = el.id;
    songName.textContent = el.title + ' | ' + el.duration;
    songName.className = `song-name`;
    song.className = 'play-item';
    song.appendChild(playIcon);
    song.appendChild(songName);
    playListField.appendChild(song);
  });
}

function playAudio() {
  audio.src = playList[playNum].src;
  tracks[playNum].classList.add('item-active');
  playlistPlayButtons[playNum].classList.add('pause');
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
}

function playNext() {
  tracks[playNum].classList.remove('item-active');
  playlistPlayButtons[playNum].classList.remove('pause');
  playNum += 1;
  if (playNum === 4) playNum = 0;
  playAudio();
  playButton.classList.add('pause');
}

function playPrev() {
  tracks[playNum].classList.remove('item-active');
  playlistPlayButtons[playNum].classList.remove('pause');
  playNum -= 1;
  if (playNum === -1) playNum = 3;
  playAudio();
  playButton.classList.add('pause');
}
let audioCurTime;
playlistPlayButtons.forEach((el) => {
  el.addEventListener('click', (evt) => {
    playButton.classList.toggle('pause');
    if (el.classList.contains('pause')) {
      el.classList.remove('pause');
      audioCurTime = audio.currentTime;
      audio.pause();
      isPlay = false;
    } else if (!isPlay && tracks[playNum].classList.contains('item-active') && el.id === playNum) {
      el.classList.add('pause');
      audio.currentTime = audioCurTime;
      audio.play();
    } else {
      el.classList.add('pause');
      playlistPlayButtons[playNum].classList.remove('pause');
      tracks[playNum].classList.remove('item-active');
      playNum = +evt.target.id;
      tracks[playNum].classList.add('item-active');
      playAudio();
    }
  });
});

playButton.addEventListener('click', () => {
  playButton.classList.toggle('pause');
  if (isPlay) {
    audioCurTime = audio.currentTime;
    audio.pause();
    playlistPlayButtons[playNum].classList.remove('pause');
    isPlay = false;
  } else {
    playAudio();
  }
});
playPrevButton.addEventListener('click', playPrev);
playNextButton.addEventListener('click', playNext);

audio.onended = () => {
  tracks[playNum].classList.remove('item-active');
  playNum += 1;
  if (playNum === 4) playNum = 0;
  playAudio();
};

changeQuoteButton.addEventListener('click', () => {
  changeQuoteButton.classList.toggle('rotate');
});

let randomNum;

function showDate() {
  const day = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  if (lang === 'ru') {
    dateContainer.textContent = day.toLocaleDateString('ru-RU', options);
  } else {
    dateContainer.textContent = day.toLocaleDateString('en-US', options);
  }
}

function showTime() {
  const date = new Date();
  timeContainer.textContent = date.toLocaleTimeString();
  showDate();
  showGreeting(lang);
  setTimeout(showTime, 1000);
}

function getHours() {
  const date = new Date();
  const hours = date.getHours();
  return hours;
}

function getTimeOfDay(lang) {
  if (getHours() >= 6 && getHours() < 12) return lang === 'ru' ? 'утро' : 'morning';
  else if (getHours() >= 12 && getHours() < 18) return lang === 'ru' ? 'день' : 'afternoon';
  else if (getHours() >= 18 && getHours() < 24) return lang === 'ru' ? 'вечер' : 'evening';
  else if (getHours() >= 0 && getHours() < 6) return lang === 'ru' ? 'ночи' : 'night';
}
function showGreeting(lang = 'en') {
  if (lang === 'ru') {
    greetingContainer.textContent = `${endings[getTimeOfDay(lang)]} ${getTimeOfDay(lang)},`;
  } else {
    greetingContainer.textContent = `Good ${getTimeOfDay(lang)},`;
  }
}

function setLocalStorage() {
  localStorage.setItem('userName', nameContainer.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('userName')) nameContainer.value = localStorage.getItem('userName');
  if (localStorage.getItem('city')) city.value = localStorage.getItem('city');
  getWeather();
}

window.addEventListener('load', () => {
  getLocalStorage();
  if (city.value === '') {
    if ((lang = 'ru')) {
      city.value = 'Минск';
    } else {
      city.value = 'Minsk';
    }
  }
});

function getRandomNum(min, max) {
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}
function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = String(randomNum).padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Vadosdavos/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.addEventListener('load', () => (body.style.backgroundImage = `url(${img.src})`));
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

function weatherClearText() {
  temperature.textContent = '';
  weatherDescription.textContent = '';
  wind.textContent = '';
  humidity.textContent = '';
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=d2330da0be102c4023a469490ba496c9&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === '404') {
    weatherClearText();
    if (lang === 'ru') {
      weatherError.textContent = `Ошибка! Город ${city.value} не найден!`;
    } else {
      weatherError.textContent = `Error! City not found for ${city.value}!`;
    }
  } else if (data.cod === '400') {
    weatherClearText();
    if (lang === 'ru') {
      weatherError.textContent = `Ошибка! Нечего геокодировать для ${city.value}!`;
    } else {
      weatherError.textContent = `Error! Nothing to geocode for ${city.value}!`;
    }
  } else {
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${lang === 'ru' ? 'Cкорость ветра:' : 'Wind speed:'} ${Math.round(data.wind.speed)} ${lang === 'ru' ? 'м/с' : 'm/s'}`;
    humidity.textContent = `${lang === 'ru' ? 'Влажность:' : 'Humidity:'} ${Math.round(data.main.humidity)}%`;
  }
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

window.addEventListener('load', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('change', getWeather);
setPlaceholders();

async function getQuote() {
  const res = lang === 'ru' ? await fetch('js/quotes-ru.json') : await fetch('js/quotes.json');
  const quotes = await res.json();
  let randomNumQuote = Math.floor(Math.random() * (quotes.length + 1));
  quote.textContent = quotes[randomNumQuote].text;
  author.textContent = quotes[randomNumQuote].author;
}

changeQuoteButton.addEventListener('click', getQuote);

getQuote();
getRandomNum(1, 20);
showTime();
setBg();
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
