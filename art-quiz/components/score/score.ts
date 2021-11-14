import { BaseComponent } from '../base-component';
import { CategoriesTypes } from '../categories/categories.type';
import './score.scss';

export class Score extends BaseComponent {
  title = new BaseComponent('h2', ['score-title'], 'Результаты');
  homeButton = new BaseComponent(
    'button',
    ['button', 'home-button'],
    'На главную'
  );
  categoriesButton = new BaseComponent(
    'button',
    ['button', 'categ-button'],
    'Категории'
  );
  scoreWrapper: BaseComponent;
  constructor() {
    super('section', ['score']);
    this.element.prepend(this.homeButton.element);
    this.element.append(this.title.element);
    this.element.append(this.categoriesButton.element);
    this.scoreWrapper = new BaseComponent('div', ['score-wrapper']);
    this.element.append(this.scoreWrapper.element);
  }
}
