import { BaseComponent } from '../base-component';
import './categories-card.scss';

export class CategoriesCard extends BaseComponent {
  scoreButton: BaseComponent;
  constructor(title: string) {
    super('div', ['categories-card'], title);
    this.scoreButton = new BaseComponent('div', ['score-button']);
    this.element.append(this.scoreButton.element);
  }
}
