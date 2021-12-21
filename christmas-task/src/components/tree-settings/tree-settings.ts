import { BaseComponent } from '../base-componet';
import { InputComponent, InputTypes } from '../input-component';
import './tree-settings.scss';

const TREE_TYPE_NUM = 7;
const BG_TYPE_NUM = 11;
const LIGHTS_COLORS = ['multi', 'red', 'yellow', 'blue', 'deeppink'];
export class Settings extends BaseComponent {
  soundButton = new BaseComponent('button', ['sound-button'], 'sound');
  snowButton = new BaseComponent('button', ['snow-button'], 'snow');
  buttonsContainer = new BaseComponent('div', ['buttons-container']);
  treeTypeContainer = new BaseComponent(
    'div',
    ['tree-type-container'],
    'Выберите ёлку',
  );
  bgTypeContainer = new BaseComponent(
    'div',
    ['background-type-container'],
    'Выберите фон',
  );
  lightsContainer = new BaseComponent(
    'div',
    ['lights-container'],
    'Выберите гирлянду',
  );
  lightsTypeContainer = new BaseComponent('div', ['lights-type-container']);
  constructor() {
    super('div', ['tree-settings']);
    this.render();
  }
  lightsOffButton = new InputComponent(
    InputTypes.checkbox,
    ['lights-off-button'],
    'выключить',
  );

  private render(): void {
    this.buttonsContainer.element.append(
      this.soundButton.element,
      this.snowButton.element,
    );
    this.renderSettingsCards('tree', TREE_TYPE_NUM, this.treeTypeContainer);
    this.renderSettingsCards('bg', BG_TYPE_NUM, this.bgTypeContainer);
    this.renderLightsTypes();
    this.lightsContainer.element.append(
      this.lightsTypeContainer.element,
      this.lightsOffButton.element,
    );
    this.element.append(
      this.buttonsContainer.element,
      this.treeTypeContainer.element,
      this.bgTypeContainer.element,
      this.lightsContainer.element,
    );
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
      target.element.append(item.element);
    }
  }

  private renderLightsTypes(): void {
    LIGHTS_COLORS.forEach((el) => {
      const item = new BaseComponent(
        'button',
        ['light-button', `light-${el}`],
        el,
      );
      this.lightsTypeContainer.element.append(item.element);
    });
  }
}
