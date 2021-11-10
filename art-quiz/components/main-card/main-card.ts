import { BaseComponent } from '../base-component';
import './main-card.scss';

export class MainCard extends BaseComponent {
  title: BaseComponent;

  constructor(style: string, cardTitle: string) {
    super('div', ['main-card']);
    this.title = new BaseComponent('h2', ['card-title', style], cardTitle);
    this.element.appendChild(this.title.element);
  }
}
