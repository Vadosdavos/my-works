import { BaseComponent } from '../base-componet';
import './toy-card.scss';

export class ToyCard extends BaseComponent {
  constructor() {
    super('div', ['toy-card'], 'toy-card');
  }
}
