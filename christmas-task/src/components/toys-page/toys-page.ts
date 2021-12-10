import { BaseComponent } from '../base-componet';
import { Filters } from '../filters/filters';
import { Ranges } from '../ranges/ranges';
import { Sort } from '../sort/sort';
import { ToyCard } from '../toy-card/toy-card';
import { ToyCardType } from './toy-card.type';
import data from '../../data';
import './toys-page.scss';

export class ToysPage extends BaseComponent {
  toysContainer = new BaseComponent('div', ['toys-container']);
  controlsContainer = new BaseComponent('div', ['controls-container']);
  // toyCard: ToyCard;
  filters = new Filters();
  ranges = new Ranges();
  sort = new Sort();

  constructor() {
    super('section', ['toys-page']);
    this.render();
  }

  render() {
    this.controlsContainer.element.append(
      this.filters.element,
      this.ranges.element,
      this.sort.element
    );
    this.toysContainer.element.append(...this.renderCards(data));
    this.toysContainer.element.addEventListener('click', (event) => {
      const target = event.target as HTMLDivElement;
      if (target.className.includes('toy-card')) {
        target.classList.toggle('marked');
      }
    });
    this.element.append(
      this.controlsContainer.element,
      this.toysContainer.element
    );
  }

  renderCards(data: ToyCardType[]) {
    return data.map((el) => {
      const toyCard = new ToyCard(el);
      return toyCard.element;
    });
  }
}
