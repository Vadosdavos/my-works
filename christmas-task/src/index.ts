import './styles.scss';

import { App } from './app';

window.onload = () => {
  const appElement = document.getElementById('app');

  if (!appElement) {
    throw Error('App root element not found!');
  }

  new App(appElement);
};

console.log(
  'Score: 200 / 200 \n Вёрстка страниц приложения и навигация между ними +30; \n Меню с настройками +50 (кнопка сброса настроект сбрасывает local storage - после перезагрузки настройки не сохраняются) \n Гирлянда +40 \n Игрушки в избранном +80 \n Дополнительного функционала нет.',
);
