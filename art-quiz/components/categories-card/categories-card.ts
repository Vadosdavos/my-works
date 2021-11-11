import { BaseComponent } from '../base-component';
import './categories-card.scss';

export class CategoriesCard extends BaseComponent {
  constructor(title: string) {
    super('div', ['categories-card'], title);
  }
}
