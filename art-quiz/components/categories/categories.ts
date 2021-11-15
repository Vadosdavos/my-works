import { BaseComponent } from '../base-component';
import { CategoriesCard } from '../categories-card/categories-card';
import { PageTitle } from '../title/page-title';
import './categories.scss';
import { CategoriesTypes, ImagesData } from './categories.type';

export class Categories extends BaseComponent {
  title: PageTitle;
  type: CategoriesTypes;
  homeButton = new BaseComponent(
    'button',
    ['button', 'home-button'],
    'На главную'
  );
  categoriesCardsWrapper: BaseComponent;
  artistsData: ImagesData[] = [];

  constructor(type: CategoriesTypes) {
    super('section', ['categories']);
    this.title = new PageTitle('Категории');
    this.element.append(this.title.element);
    this.type = type;
    this.categoriesCardsWrapper = new BaseComponent('div', ['cards-wrapper']);
    this.element.append(this.homeButton.element);
    this.element.append(this.categoriesCardsWrapper.element);
    this.element.append(this.type); /* УБРАТЬ ПОТОМ */

    if (this.type === CategoriesTypes.artists) {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((el) => {
        let card = new CategoriesCard(el.toString()).element;
        card.style.backgroundImage = `url(./cat${el}.webp)`;
        this.categoriesCardsWrapper.element.append(card);
        // card.addEventListener('click', () => {
        //   console.log(card.innerText);
        // });
      });
    }

    if (this.type === CategoriesTypes.pictures) {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((el) => {
        let card = new CategoriesCard(el.toString()).element;
        card.style.backgroundImage = `url(./cat${el + 12}.webp)`;
        this.categoriesCardsWrapper.element.append(card);
        // card.addEventListener('click', () => {
        //   console.log(card.innerText);
        // });
      });
    }

    this.getImagesData().then(
      (data) => {
        this.artistsData = data;
        console.log(this.artistsData);
      },
      (err) => {
        throw new Error('Json not found!');
      }
    );
  }

  async getImagesData() {
    const res = await fetch('./images.json');
    const data = await res.json();
    return data;
  }
}
