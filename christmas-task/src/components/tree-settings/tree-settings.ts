import { BaseComponent } from '../base-componet';
import './tree-settings.scss';

export class Settings extends BaseComponent {
  soundButton = new BaseComponent('button', ['sound-button'], 'sound');
  snowButton = new BaseComponent('button', ['snow-button'], 'snow');
  buttonsContainer = new BaseComponent('div', ['buttons-container']);
  treeTypeContainer = new BaseComponent('div', ['tree-type-container']);
  constructor() {
    super('div', ['tree-settings']);
    this.render();
  }

  private render() {
    this.buttonsContainer.element.append(
      this.soundButton.element,
      this.snowButton.element,
    );
    this.renderTreeType();
    this.element.append(
      this.buttonsContainer.element,
      this.treeTypeContainer.element,
    );
  }

  private renderTreeType() {
    for (let i = 1; i < 7; i++) {
      const treeType = new BaseComponent('div', ['tree-type']);
      treeType.element.style.backgroundImage = `url(../../assets/tree/${i}.png)`;
      this.treeTypeContainer.element.append(treeType.element);
    }
  }
}
