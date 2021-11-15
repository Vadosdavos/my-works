import { BaseComponent } from '../base-component';
import './page-title.scss';

export class PageTitle extends BaseComponent {
  logo: BaseComponent;
  titleText?: BaseComponent;

  constructor(text?: string) {
    super('div', ['page-title']);
    this.logo = new BaseComponent('div', ['logo']);
    this.element.append(this.logo.element);
    if (text) {
      this.titleText = new BaseComponent('h2', ['page-title-text'], text);
      this.element.append(this.titleText?.element);
    }
  }
}
