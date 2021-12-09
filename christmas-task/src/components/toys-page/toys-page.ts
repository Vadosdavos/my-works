import { BaseComponent } from '../base-componet';
import { Filters } from '../filters/filters';
import { ToyCard } from '../toy-card/toy-card';
import './toys-page.scss';

export class ToysPage extends BaseComponent {
  toysContainer = new BaseComponent('div', ['toys-container']);
  controlsContainer = new BaseComponent('div', ['controls-container']);
  toyCard = new ToyCard();
  filters = new Filters();

  constructor() {
    super('section', ['toys-page']);
    this.render();
  }

  render() {
    this.controlsContainer.element.append(this.filters.element);
    this.toysContainer.element.append(this.toyCard.element);
    this.element.append(
      this.controlsContainer.element,
      this.toysContainer.element
    );
  }
}
