import { BaseComponent } from '../base-component';
import './settings.scss';

export class Settings extends BaseComponent {
  title = new BaseComponent('h2', ['settings-title'], 'Настройки');
  saveButton = new BaseComponent('button', ['button', 'save-button'], 'Сохранить');

  constructor() {
    super('section', ['settings-wrapper', 'hidden']);
    this.element.append(this.title.element, this.saveButton.element);
  }
}
