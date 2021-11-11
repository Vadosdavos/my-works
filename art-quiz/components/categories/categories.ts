import { BaseComponent } from '../base-component';
import { CategoriesCard } from '../categories-card/categories-card';
import { CategoriesTypes } from '../categories-field/categories-field';
import './categories.scss';

export class Categories extends BaseComponent {
  title = new BaseComponent('h2', ['categories-title'], 'Категории');
  type: CategoriesTypes;

  constructor(type: CategoriesTypes) {
    super('div', ['categories']);
    this.element.append(this.title.element);
    this.type = type;

    if (this.type === CategoriesTypes.artists) {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((el) => {
        let card = new CategoriesCard(el.toString()).element;
        this.element.append(card);
        card.addEventListener('click', () => {
          console.log(card.innerText);
        });
      });
    }

    if (this.type === CategoriesTypes.pictures) {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((el) =>
        this.element.append(new CategoriesCard(el.toString()).element)
      );
    }
  }
}
