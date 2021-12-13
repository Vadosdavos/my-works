import { BaseComponent } from '../base-componet';
import './ranges.scss';

export class Ranges extends BaseComponent {
  title = new BaseComponent('h3', ['filters-title'], 'Фильтры по диапазону');
  amount = new BaseComponent('div', ['amout-container'], 'amout');
  year = new BaseComponent('div', ['year-container'], 'year');

  constructor() {
    super('div', ['ranges']);
    this.render();
  }
  render() {
    this.element.append(
      this.title.element,
      this.amount.element,
      this.year.element
    );
  }
}
