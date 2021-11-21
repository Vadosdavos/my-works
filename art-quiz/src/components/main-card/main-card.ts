import { BaseComponent } from '../base-component';
import './main-card.scss';

export class MainCard extends BaseComponent {
  title: BaseComponent;

  constructor(style: string, cardTitle: string) {
    super('div', ['main-card', style]);
    this.title = new BaseComponent('h2', ['card-title'], cardTitle);
    this.element.appendChild(this.title.element);
  }
}
