import playList from './playList.js';
import endings from './objects.js';

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
const audioLength = document.querySelector('.audio-length');
const audioVolume = document.querySelector('.volume');
const audioDuration = document.querySelector('.duration');
const songTitle = document.querySelector('.song-title');
const sound = document.querySelector('.sound');
let curVolume = 0.5;
let mousedown = false;
let audioCurTime;
const audioCurTimeText = document.querySelector('.audio-cur-time');
const settingsTitle = document.querySelector('.settings-title');
const settingsContainer = document.querySelector('.set-container');
const settingsButton = document.querySelector('.set');
const settingsCloseButton = document.querySelector('.set-close');
let photoTag = '';
let flickrUrlsArr;
const state = {
  lang: 'en',
  photoSource: 'github',
  blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audio'],
};
const langInputs = document.querySelectorAll('.lang-input');
const updateVolume = function () {
  const value = this.value;
  audio[this.name] = value;
  curVolume = audio.volume;
  if (audio.volume === 0) {
    sound.classList.add('sound-stop');
  } else sound.classList.remove('sound-stop');
};

const handleProgress = function () {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  audioLength.value = percent;
  audioCurTimeText.textContent = getTimeCodeFromNum(audio.currentTime);
};

const scrub = function (event) {
  const scrubTime = (event.offsetX / audioLength.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
};

const mute = function () {
  sound.classList.toggle('sound-stop');
  audio.volume != 0 ? (audio.volume = 0) : (audio.volume = curVolume);
  audioVolume.value = audio.volume;
};

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;
  if (hours === 0) {
    return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function setPlaceholders() {
  if (state.lang === 'ru') {
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
  audioDuration.textContent = playList[playNum].duration;
  songTitle.textContent = playList[playNum].title;
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
playlistPlayButtons.forEach((el) => {
  el.addEventListener('click', (evt) => {
    if (el.classList.contains('pause')) {
      playButton.classList.remove('pause');
      el.classList.remove('pause');
      audioCurTime = audio.currentTime;
      audio.pause();
      isPlay = false;
    } else if (!isPlay && tracks[playNum].classList.contains('item-active') && el.id === playNum) {
      playButton.classList.add('pause');
      el.classList.add('pause');
      audio.currentTime = audioCurTime;
      audio.play();
    } else {
      el.classList.add('pause');
      playlistPlayButtons[playNum].classList.remove('pause');
      tracks[playNum].classList.remove('item-active');
      playNum = +evt.target.id;
      playButton.classList.add('pause');
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
  playlistPlayButtons[playNum].classList.remove('pause');
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
  if (state.lang === 'ru') {
    dateContainer.textContent = day.toLocaleDateString('ru-RU', options);
  } else {
    dateContainer.textContent = day.toLocaleDateString('en-US', options);
  }
}

function showTime() {
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
  if (getHours() >= 6 && getHours() < 12) return state.lang === 'ru' ? 'утро' : 'morning';
  else if (getHours() >= 12 && getHours() < 18) return state.lang === 'ru' ? 'день' : 'afternoon';
  else if (getHours() >= 18 && getHours() < 24) return state.lang === 'ru' ? 'вечер' : 'evening';
  else if (getHours() >= 0 && getHours() < 6) return state.lang === 'ru' ? 'ночи' : 'night';
}
function showGreeting() {
  if (state.lang === 'ru') {
    greetingContainer.textContent = `${endings[getTimeOfDay(state.lang)]} ${getTimeOfDay(state.lang)},`;
  } else {
    greetingContainer.textContent = `Good ${getTimeOfDay(state.lang)},`;
  }
}
function setLocalStorage() {
  localStorage.setItem('userName', nameContainer.value);
  localStorage.setItem('city', city.value);

  localStorage.setItem('lang', state.lang);
}
console.log('ЗАПОМИНАЕТСЯ РУССКИЙ ЯЗЫК');
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('userName')) nameContainer.value = localStorage.getItem('userName');
  if (localStorage.getItem('city')) city.value = localStorage.getItem('city');
  if (localStorage.getItem('lang')) state.lang = localStorage.getItem('lang');
  getWeather();
}
function setCityName() {
  if (city.value === '') {
    if ((state.lang = 'ru')) {
      city.value = 'Минск';
    } else {
      city.value = 'Minsk';
    }
  }
}
window.addEventListener('load', () => {
  setCityName();
  getLocalStorage();
  getWeather();
});

function getRandomNum(min, max) {
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

async function getUnsplashImages() {
  const timeOfDay = getTimeOfDay();
  let key = 'mqoEykHFq6TpCZ-jzGnGA2QWp4H7CqqDVLjDx7tNVQQ';
  let key2 = '4ACglsyIKsJ0xcoZyT3M9kjfC7QFPmqYC1lXFfIH-Ro';
  let url;
  if (photoTag !== '') {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${photoTag}&client_id=${key}`;
  } else {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=${key}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = data.urls.regular;
  img.addEventListener('load', () => (body.style.backgroundImage = `url(${img.src})`));
}

async function getFlickrImages() {
  const timeOfDay = getTimeOfDay();
  let key = 'bea8c11052155e6ad750417f790467fd';
  let url;
  if (photoTag !== '') {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${photoTag}&extras=url_l&format=json&nojsoncallback=1&media=photos&per_page=21`;
  } else {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1&media=photos&per_page=21`;
  }
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  flickrUrlsArr = data.photos.photo;
  img.src = flickrUrlsArr[randomNum].url_l;
  img.addEventListener('load', () => (body.style.backgroundImage = `url(${img.src})`));
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
  // getFlickrImages();
}
function getSlidePrev() {
  randomNum -= 1;
  if (randomNum === 1) randomNum = 20;
  setBg();
  // getFlickrImages();
}

function weatherClearText() {
  temperature.textContent = '';
  weatherDescription.textContent = '';
  wind.textContent = '';
  humidity.textContent = '';
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&state.lang=${state.lang}&appid=d2330da0be102c4023a469490ba496c9&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === '404') {
    weatherClearText();
    if (state.lang === 'ru') {
      weatherError.textContent = `Ошибка! Город ${city.value} не найден!`;
    } else {
      weatherError.textContent = `Error! City not found for ${city.value}!`;
    }
  } else if (data.cod === '400') {
    weatherClearText();
    if (state.lang === 'ru') {
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
    wind.textContent = `${state.lang === 'ru' ? 'Cкорость ветра:' : 'Wind speed:'} ${Math.round(data.wind.speed)} ${state.lang === 'ru' ? 'м/с' : 'm/s'}`;
    humidity.textContent = `${state.lang === 'ru' ? 'Влажность:' : 'Humidity:'} ${Math.round(data.main.humidity)}%`;
  }
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

city.addEventListener('keypress', setCity);
city.addEventListener('change', getWeather);
setPlaceholders();

async function getQuote() {
  const res = state.lang === 'ru' ? await fetch('js/quotes-ru.json') : await fetch('js/quotes.json');
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
// getUnsplashImages();
// getFlickrImages();
// slideNext.addEventListener('click', getUnsplashImages);
// slidePrev.addEventListener('click', getUnsplashImages);
slideNext.addEventListener('click', () => {
  getSlideNext();
  // const img = new Image();
  // randomNum += 1;
  // if (randomNum === 21) randomNum = 1;
  // img.src = flickrUrlsArr[randomNum].url_l;
  // console.log(randomNum, flickrUrlsArr);
  // img.addEventListener('load', () => (body.style.backgroundImage = `url(${img.src})`));
});
slidePrev.addEventListener('click', getSlidePrev);

audio.addEventListener('timeupdate', () => {
  handleProgress();
});
audioLength.addEventListener('click', scrub);
audioLength.addEventListener('mousemove', (event) => mousedown && scrub(event));
audioLength.addEventListener('mousedown', () => (mousedown = true));
audioLength.addEventListener('mouseup', () => (mousedown = false));
sound.addEventListener('click', () => {
  mute();
});
audioVolume.addEventListener('input', updateVolume);

settingsButton.addEventListener('click', () => {
  settingsContainer.classList.add('set-visible');
});
settingsCloseButton.addEventListener('click', () => {
  settingsContainer.classList.remove('set-visible');
});
langInputs.forEach((el) => {
  el.addEventListener('change', () => {
    state.lang = el.value;
    setPlaceholders();
    showTime();
    getQuote();
    getWeather();
  });
});
