import { BaseComponent } from '../base-component';
import { ImagesData } from '../categories/categories.type';
import './score-card.scss';

export class ScoreCard extends BaseComponent {
  categoryData: ImagesData;
  cardInfo: BaseComponent;

  constructor(categoryData: ImagesData) {
    super('div', ['score-card']);
    this.categoryData = categoryData;
    this.cardInfo = new BaseComponent('div', ['card-info']);
    const name = new BaseComponent(
      'div',
      ['score-name'],
      this.categoryData.name
    );
    const author = new BaseComponent(
      'div',
      ['score-author'],
      this.categoryData.author
    );
    const year = new BaseComponent(
      'div',
      ['score-year'],
      this.categoryData.year
    );
    this.cardInfo.element.append(name.element, author.element, year.element);
    this.element.append(this.cardInfo.element);
    this.element.addEventListener('click', () => {
      this.element.classList.toggle('visible');
    });
  }
}
