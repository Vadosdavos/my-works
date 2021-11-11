import { BaseComponent } from '../base-component';
import { CategoriesCard } from '../categories-card/categories-card';
import './categories-field.scss';

export enum CategoriesTypes {
  artists = 'artists',
  pictures = 'pictures',
}

export class CategoriesField extends BaseComponent {
  type: CategoriesTypes;
  // card: CategoriesCard;
  constructor(type: CategoriesTypes) {
    super('div', ['categories-field']);
    this.type = type;

    if (this.type === CategoriesTypes.artists) {
      console.log(this.type);
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((el) =>
        this.element.append(new CategoriesCard(el.toString()).element)
      );
    }
  }
}
