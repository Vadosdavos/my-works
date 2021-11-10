import { BaseComponent } from '../base-component';
import './settings.scss';

export class Settings extends BaseComponent {
  title = new BaseComponent('h1', ['settings-title'], 'Settings');
  saveButton = new BaseComponent('button', ['button', 'save-button'], 'Save');

  constructor() {
    super('section', ['settings-wrapper', 'hidden']);
    this.element.append(this.title.element, this.saveButton.element);
  }
}
