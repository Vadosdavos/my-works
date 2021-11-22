import { settings } from '../../app';
import { BaseComponent } from '../base-component';
import { PageTitle } from '../title/page-title';
import './settings.scss';

export class Settings extends BaseComponent {
  title = new PageTitle('Настройки');

  sound = new BaseComponent('div', ['set', 'sound-set'], 'Звук');

  timer = new BaseComponent('div', ['set', 'time-set'], 'Игра на время');

  soundIcon = new BaseComponent('span', ['sound-icon']);

  soundBar = new BaseComponent('input', ['sound-bar']);

  timerBar = new BaseComponent('input', ['timer-bar']);

  timerIcon = new BaseComponent('span', ['timer-icon']);

  saveButton = new BaseComponent(
    'button',
    ['button', 'save-button'],
    'Сохранить',
  );

  constructor() {
    super('section', ['settings-wrapper', 'hidden']);
    this.soundBar.element.setAttribute('type', 'range');
    this.timerBar.element.setAttribute('type', 'range');
    this.sound.element.append(this.soundIcon.element, this.soundBar.element);
    this.timer.element.append(this.timerIcon.element, this.timerBar.element);
    this.setSound();
    this.setTimer();
    this.saveButton.element.addEventListener('click', () => {
      this.setSettingsToLocal();
    });
    this.element.append(
      this.title.element,
      this.sound.element,
      this.timer.element,
      this.saveButton.element,
    );
  }

  setSound() {
    let isAudio: boolean;
    if (localStorage.getItem('audio')) {
      isAudio = JSON.parse(localStorage.getItem('audio') as string);
      if (isAudio) {
        this.soundIcon.element.classList.remove('sound-off');
        this.soundBar.element.removeAttribute('disabled');
        settings.audio = true;
      } else {
        this.soundIcon.element.classList.add('sound-off');
        this.soundBar.element.setAttribute('disabled', 'true');
        settings.audio = false;
      }
    }
    this.soundIcon.element.addEventListener('click', () => {
      this.soundIcon.element.classList.toggle('sound-off');
      if (this.soundBar.element.hasAttribute('disabled')) {
        this.soundBar.element.removeAttribute('disabled');
        settings.audio = true;
      } else {
        this.soundBar.element.setAttribute('disabled', 'true');
        settings.audio = false;
      }
    });
  }

  setTimer() {
    let isTimer: boolean;
    if (localStorage.getItem('timer')) {
      isTimer = JSON.parse(localStorage.getItem('timer') as string);
      if (isTimer) {
        this.timerIcon.element.classList.remove('timer-off');
        this.timerBar.element.removeAttribute('disabled');
        settings.timer = true;
      } else {
        this.timerIcon.element.classList.add('timer-off');
        this.timerBar.element.setAttribute('disabled', 'true');
        settings.timer = false;
      }
    }
    this.timerIcon.element.addEventListener('click', () => {
      this.timerIcon.element.classList.toggle('timer-off');
      if (this.timerBar.element.hasAttribute('disabled')) {
        this.timerBar.element.removeAttribute('disabled');
        settings.timer = true;
      } else {
        this.timerBar.element.setAttribute('disabled', 'true');
        settings.timer = false;
      }
    });
  }

  setSettingsToLocal() {
    localStorage.setItem('audio', JSON.stringify(settings.audio));
    localStorage.setItem('timer', JSON.stringify(settings.timer));
  }
}
