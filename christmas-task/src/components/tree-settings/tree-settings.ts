import { BaseComponent } from '../base-componet';
import { InputComponent, InputTypes } from '../input-component';
import './tree-settings.scss';

const TREE_TYPE_NUM = 7;
const BG_TYPE_NUM = 11;
const LIGHTS_COLORS = ['multi', 'red', 'yellow', 'blue', 'deeppink'];
let VAD_AUDIO = false;
export class Settings extends BaseComponent {
  private soundButton = new BaseComponent('button', ['sound-button']);

  public snowButton = new BaseComponent('button', ['snow-button']);

  private buttonsContainer = new BaseComponent('div', ['buttons-container']);

  public treeTypeContainer = new BaseComponent('div', ['tree-type-container']);

  public bgTypeContainer = new BaseComponent('div', [
    'background-type-container',
  ]);

  private lightsContainer = new BaseComponent('div', ['lights-container']);

  public lightsTypeContainer = new BaseComponent('div', [
    'lights-type-container',
  ]);

  private lightsOffContainer = new BaseComponent('div', [
    'lights-off-container',
  ]);

  public lightsOffButton = new InputComponent(InputTypes.checkbox, [
    'lights-off-button',
  ]);

  private lightsOffLabel = new BaseComponent(
    'label',
    ['lights-off-label'],
    'on off',
  );

  private clearTreeSettingsButton = new BaseComponent(
    'button',
    ['reset'],
    'Сброс сохранения',
  );

  constructor() {
    super('div', ['tree-settings']);
    this.render();
  }

  private render(): void {
    this.buttonsContainer.element.append(
      this.soundButton.element,
      this.snowButton.element,
      this.clearTreeSettingsButton.element,
    );
    this.clearTreeSettingsButton.element.addEventListener('click', () => {
      localStorage.removeItem('vad-tree');
      localStorage.removeItem('vad-settings');
      localStorage.removeItem('vad-snow');
      localStorage.removeItem('vad-bg');
    });
    this.renderSettingsCards('tree', TREE_TYPE_NUM, this.treeTypeContainer);
    this.renderSettingsCards('bg', BG_TYPE_NUM, this.bgTypeContainer);
    this.renderLightsTypes();
    this.renderLightOff();
    this.element.append(
      this.buttonsContainer.element,
      this.treeTypeContainer.element,
      this.bgTypeContainer.element,
      this.lightsContainer.element,
    );
    this.playAudio();
  }

  private renderSettingsCards(
    name: string,
    amount: number,
    target: BaseComponent,
  ): void {
    for (let i = 1; i < amount; i++) {
      const item = new BaseComponent('div', [`${name}-type`]);
      item.element.style.backgroundImage = `url(../../assets/${name}/${i}.${
        name === 'tree' ? 'png' : 'jpg'
      })`;
      if (i === 1) {
        item.element.classList.add('type-active');
      }
      target.element.append(item.element);
    }
  }

  private renderLightsTypes(): void {
    LIGHTS_COLORS.forEach((el) => {
      const item = new BaseComponent('button', ['light-button', `light-${el}`]);
      if (el === 'multi') {
        item.element.classList.add('type-active');
      }
      item.element.dataset.color = el;
      this.lightsTypeContainer.element.append(item.element);
    });
  }

  private renderLightOff(): void {
    this.lightsOffLabel.element.setAttribute('for', 'off-checkbox');
    this.lightsOffButton.element.setAttribute('id', 'off-checkbox');
    this.lightsOffContainer.element.append(
      this.lightsOffButton.element,
      this.lightsOffLabel.element,
    );
    this.lightsContainer.element.append(
      this.lightsTypeContainer.element,
      this.lightsOffContainer.element,
    );
  }

  private playAudio(): void {
    const url: string = './song.mp3';
    const audio = new Audio(url);
    audio.volume = 0.2;
    audio.loop = true;
    if (localStorage.getItem('vad-audio')) {
      VAD_AUDIO = JSON.parse(localStorage.getItem('vad-audio') as string);
    }
    if (VAD_AUDIO) {
      document.addEventListener(
        'click',
        () => {
          audio.play();
        },
        { once: true },
      );
      this.soundButton.element.classList.add('sound-active');
    } else {
      audio.pause();
      this.soundButton.element.classList.remove('sound-active');
    }
    this.setSoundListener(audio);
  }

  private setSoundListener(song: HTMLAudioElement): void {
    this.soundButton.element.addEventListener('click', () => {
      this.soundButton.element.classList.toggle('sound-active');
      VAD_AUDIO = !VAD_AUDIO;
      localStorage.setItem('vad-audio', VAD_AUDIO + '');
      if (VAD_AUDIO) {
        song.play();
      } else {
        song.pause();
      }
    });
  }

  public createSnowfall(target: HTMLElement): void {
    const removeTime = 5000;
    const animationConst = 3;
    const animationDur = 2;
    const fontConst = 10;
    const flake = new BaseComponent('i', ['fas', 'fa-snowflake']);
    flake.element.style.left = Math.random() * target.clientWidth + 'px';
    flake.element.style.animationDuration =
      Math.random() * animationConst + animationDur + 's';
    flake.element.style.opacity = Math.random() + '';
    flake.element.style.fontSize = Math.random() * fontConst + fontConst + 'px';
    target.appendChild(flake.element);
    setTimeout(() => {
      flake.element.remove();
    }, removeTime);
  }
}
