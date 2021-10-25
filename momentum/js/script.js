console.log(
  'Score: 150 / 150 \n Часы и календарь +15  \n Приветствие +10 \n Смена фонового изображения +20 \n Виджет погоды +15 \n Виджет цитата дня +10 \n Аудиоплеер +15 \n Продвинутый аудиоплеер (прогресс-бар корректно работает на десктопе, на мобилках вроде как заданием не проверяется) +20 \n Перевод приложения на два языка (en/ru) +15 \n Получение фонового изображения от API +10 \n Настройки приложения +20 \n Вёрстка адаптивная - мин разрешение 320px. Интерактивность элементов присутствует. \n Текущий источник изображений подписывается в консоли. Первая загрузка с Flickr занимает несколько секуд, т.к. он грузит массив изображений, дальнейшее перелистывание без задержек.'
);

import playList from './playList.js';
import { endings, timeOfDayTranslate } from './objects.js';

const timeContainer = document.querySelector('.time');
const dateContainer = document.querySelector('.date');
const greetingText = document.querySelector('.greeting');
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
const settingsButton = document.querySelector('.settings-label');
const tagsInput = document.querySelector('.tags');
const tagsTitle = document.getElementById('photoTags');
const settingsCloseButton = document.querySelector('.set-close');
const settingsTitles = document.querySelectorAll('.set-item-title');
const settingsLabels = document.querySelectorAll('.input-label');
const langInputs = document.querySelectorAll('.lang-input');
const soursegInputs = document.querySelectorAll('.sourse-input');
const visibilityInputs = document.querySelectorAll('input[type=checkbox]');
let flickrUrlsArr;
const state = {
  lang: 'en',
  photoSource: 'github',
  photoTag: '',
};
let activeBlocks = ['time', 'date', 'greeting-container', 'quotes', 'weather', 'player'];
const settingTranslate = {
  ru: {
    titleLang: 'Язык',
    eng: 'Английский',
    rus: 'Русский',
    titlePhoto: 'Источник фотографий',
    photoTags: 'Теги для фото',
    blocks: 'Видимость блоков',
    github: 'Github',
    unsplash: 'Unsplash',
    flickr: 'Flickr',
    audio: 'Аудио-плеер',
    weather: 'Погода',
    time: 'Время',
    date: 'Дата',
    greet: 'Приветствие',
    quotes: 'Цитаты',
  },
  en: {
    titleLang: 'Language',
    eng: 'English',
    rus: 'Russian',
    titlePhoto: 'Photo source',
    photoTags: 'Photo tags',
    blocks: 'Page blocks visibility',
    github: 'Github',
    unsplash: 'Unsplash',
    flickr: 'Flickr',
    audio: 'Audio player',
    weather: 'Weather',
    time: 'Time',
    date: 'Date',
    greet: 'Greetings',
    quotes: 'Quotes',
  },
};
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
    tagsInput.placeholder = '[Введите теги через запятую без пробелов]';
  } else {
    city.placeholder = '[Enter city]';
    nameContainer.placeholder = '[Enter name]';
    tagsInput.placeholder = '[Set tags separated by commas without spaces]';
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
  if (getHours() >= 6 && getHours() < 12) return 'morning';
  else if (getHours() >= 12 && getHours() < 18) return 'afternoon';
  else if (getHours() >= 18 && getHours() < 24) return 'evening';
  else if (getHours() >= 0 && getHours() < 6) return 'night';
}
function showGreeting() {
  if (state.lang === 'ru') {
    greetingText.textContent = `${endings[timeOfDayTranslate[getTimeOfDay()]]} ${timeOfDayTranslate[getTimeOfDay()]},`;
  } else {
    greetingText.textContent = `Good ${getTimeOfDay()},`;
  }
}
function setLocalStorage() {
  localStorage.setItem('userName', nameContainer.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('lang', state.lang);
  localStorage.setItem('photoSource', state.photoSource);
  localStorage.setItem('photoTags', state.photoTag);
  localStorage.setItem('blocks', activeBlocks);
}
window.addEventListener('beforeunload', setLocalStorage);

function disableTags() {
  tagsTitle.style.color = '#8A8A8A';
  tagsInput.setAttribute('disabled', true);
}
function activateTags() {
  tagsTitle.style.color = '#fff';
  tagsInput.removeAttribute('disabled');
}
function preloadSetting() {
  state.lang = 'en';
  langInputs.forEach((el) => {
    if (el.value === localStorage.getItem('lang')) {
      el.setAttribute('checked', true);
    }
    if (state.lang === 'ru') {
      settingsTitle.textContent = 'Настройки';
    } else {
      settingsTitle.textContent = 'Settings';
    }
  });
  soursegInputs.forEach((el) => {
    if (el.value === localStorage.getItem('photoSource')) {
      el.setAttribute('checked', true);
    }
  });
  if (state.photoSource === 'github') {
    disableTags();
  }
  tagsInput.value = state.photoTag;
  setPlaceholders();
  visibilityInputs.forEach((el) => {
    if (activeBlocks.includes(el.name)) {
      el.setAttribute('checked', true);
      let block = document.querySelector(`.${el.name}`);
      block.style.visibility = 'visible';
      block.style.opacity = '1';
    } else {
      el.removeAttribute('checked');
      let block = document.querySelector(`.${el.name}`);
      block.style.visibility = 'hidden';
      block.style.opacity = '0';
    }
  });
}

function getLocalStorage() {
  if (localStorage.getItem('userName')) nameContainer.value = localStorage.getItem('userName');
  if (localStorage.getItem('city')) city.value = localStorage.getItem('city');
  if (localStorage.getItem('lang')) state.lang = localStorage.getItem('lang');
  if (localStorage.getItem('photoSource')) state.photoSource = localStorage.getItem('photoSource');
  if (localStorage.getItem('photoTags')) state.photoTag = localStorage.getItem('photoTags');
  if (localStorage.getItem('blocks')) activeBlocks = localStorage.getItem('blocks').split(',');
  console.log(`Загрузка фото происходит с ${state.photoSource}`);
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
  preloadSetting();
  setLanguage();
  setBg(state.photoSource);
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
  if (state.photoTag !== '') {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${state.photoTag}&client_id=${key}`;
  } else {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=${key}`;
  }
  try {
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.urls.regular;
    img.addEventListener('load', () => (body.style.backgroundImage = `url(${img.src})`));
  } catch (error) {
    console.log('Закончился базовый лимит на 50 запросов, загружаю картинку с запасного аккаунта!');
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=${key2}`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.urls.regular;
    img.addEventListener('load', () => (body.style.backgroundImage = `url(${img.src})`));
  }
}

async function getFlickrImages() {
  console.log('Идёт загрузка, пожалуйста, подождите');
  const timeOfDay = getTimeOfDay();
  let key = 'bea8c11052155e6ad750417f790467fd';
  let url;
  if (state.photoTag !== '') {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${state.photoTag}&extras=url_l&format=json&nojsoncallback=1&media=photos&per_page=21`;
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

function setBg(sourse = 'github') {
  switch (sourse) {
    case 'github':
      {
        const timeOfDay = getTimeOfDay();
        const bgNum = String(randomNum).padStart(2, '0');
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/Vadosdavos/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
        img.addEventListener('load', () => (body.style.backgroundImage = `url(${img.src})`));
      }
      break;
    case 'flickr':
      getFlickrImages();
      break;
    case 'unsplash':
      getUnsplashImages();
      break;
  }
}

function getSlideNext() {
  randomNum += 1;
  if (randomNum === 21) randomNum = 1;
  setBg(state.photoSource);
}
function getSlidePrev() {
  randomNum -= 1;
  if (randomNum === 1) randomNum = 20;
  setBg(state.photoSource);
}

function weatherClearText() {
  temperature.textContent = '';
  weatherDescription.textContent = '';
  wind.textContent = '';
  humidity.textContent = '';
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=d2330da0be102c4023a469490ba496c9&units=metric&lang=${state.lang}`;
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
function flickrNextImg() {
  const img = new Image();
  randomNum += 1;
  if (randomNum === 21) randomNum = 1;
  img.src = flickrUrlsArr[randomNum].url_l;
  img.addEventListener('load', () => (body.style.backgroundImage = `url(${img.src})`));
}
function flickrPrevImg() {
  const img = new Image();
  randomNum -= 1;
  if (randomNum === 1) randomNum = 20;
  img.src = flickrUrlsArr[randomNum].url_l;
  img.addEventListener('load', () => (body.style.backgroundImage = `url(${img.src})`));
}
slideNext.addEventListener('click', () => {
  if (state.photoSource === 'flickr') {
    flickrNextImg();
  } else {
    getSlideNext();
  }
});
slidePrev.addEventListener('click', () => {
  if (state.photoSource === 'flickr') {
    flickrPrevImg();
  } else {
    getSlidePrev();
  }
});

audio.addEventListener('timeupdate', () => {
  handleProgress();
});
audioLength.addEventListener('click', scrub);
audioLength.addEventListener('mousemove', (event) => mousedown && scrub(event));
audioLength.addEventListener('touchmove', (event) => mousedown && scrub(event));
audioLength.addEventListener('mousedown', () => (mousedown = true));
audioLength.addEventListener('touchstart', () => (mousedown = true));
audioLength.addEventListener('mouseup', () => (mousedown = false));
audioLength.addEventListener('touchend', () => (mousedown = false));
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
    if (state.lang === 'ru') {
      settingsTitle.textContent = 'Настройки';
    } else {
      settingsTitle.textContent = 'Settings';
    }
    setLanguage();
  });
});
function setLanguage() {
  let curLang = settingTranslate[state.lang];
  settingsTitles.forEach((el) => {
    el.textContent = `${curLang[el.id]}`;
  });
  settingsLabels.forEach((el) => {
    el.textContent = `${curLang[el.id]}`;
  });
}
soursegInputs.forEach((el) => {
  el.addEventListener('change', () => {
    state.photoSource = el.value;
    console.log(`Загрузка фото происходит с ${state.photoSource}`);
    setBg(state.photoSource);
    if (el.value === 'github') {
      disableTags();
    } else {
      activateTags();
    }
  });
});

tagsInput.addEventListener('keypress', (event) => {
  if (event.code === 'Enter') {
    tagsInput.blur();
  }
});
tagsInput.addEventListener('blur', () => {
  let reg = new RegExp(/^[A-Za-z0-9,]+$/);
  let value = tagsInput.value;
  if (value) {
    if (reg.test(value)) {
      state.photoTag = tagsInput.value;
      tagsInput.classList.remove('tags-invalid');
      tagsInput.classList.add('tags-valid');
      setBg(state.photoSource);
    } else {
      state.photoTag = tagsInput.value;
      tagsInput.classList.remove('tags-valid');
      tagsInput.classList.add('tags-invalid');
    }
  } else {
    tagsInput.classList.remove('tags-valid');
    state.photoTag = tagsInput.value;
  }
});
visibilityInputs.forEach((el) => {
  el.addEventListener('click', () => {
    if (!el.checked) {
      let block = document.querySelector(`.${el.name}`);
      block.style.visibility = 'hidden';
      block.style.opacity = '0';
      let index = activeBlocks.indexOf(el.name);
      activeBlocks.splice(index, 1);
    } else {
      let block = document.querySelector(`.${el.name}`);
      block.style.visibility = 'visible';
      block.style.opacity = '1';
      activeBlocks.push(el.name);
    }
  });
});
