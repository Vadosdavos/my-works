import { BaseComponent } from '../base-component';
import { CategoriesCard } from '../categories-card/categories-card';
import './categories.scss';
import { CategoriesTypes } from './categories.type';

export class Categories extends BaseComponent {
  title = new BaseComponent('h2', ['categories-title'], 'Категории');
  type: CategoriesTypes;
  homeButton = new BaseComponent(
    'button',
    ['button', 'home-button'],
    'На главную'
  );
  categoriesCardsWrapper: BaseComponent;

  constructor(type: CategoriesTypes) {
    super('section', ['categories']);
    this.element.append(this.title.element);
    this.type = type;
    this.categoriesCardsWrapper = new BaseComponent('div', ['cards-wrapper']);
    this.element.append(this.homeButton.element);
    this.element.append(this.categoriesCardsWrapper.element);
    this.element.append(this.type);

    if (this.type === CategoriesTypes.artists) {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((el) => {
        let card = new CategoriesCard(el.toString()).element;
        this.categoriesCardsWrapper.element.append(card);
        // card.addEventListener('click', () => {
        //   console.log(card.innerText);
        // });
      });
    }

    if (this.type === CategoriesTypes.pictures) {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((el) =>
        this.categoriesCardsWrapper.element.append(
          new CategoriesCard(el.toString()).element
        )
      );
    }
  }
}
