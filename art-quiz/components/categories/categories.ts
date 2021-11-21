import { BaseComponent } from '../base-component';
import { CategoriesCard } from '../categories-card/categories-card';
import { PageTitle } from '../title/page-title';
import './categories.scss';
import { CategoriesTypes } from './categories.type';

export class Categories extends BaseComponent {
  title: PageTitle;
  type: CategoriesTypes;
  homeButton = new BaseComponent(
    'button',
    ['button', 'home-button'],
    'На главную'
  );
  categoriesCardsWrapper: BaseComponent;

  constructor(type: CategoriesTypes) {
    super('section', ['categories']);
    this.title = new PageTitle('Категории');
    this.element.append(this.title.element);
    this.type = type;
    this.categoriesCardsWrapper = new BaseComponent('div', ['cards-wrapper']);
    this.element.append(this.homeButton.element);
    this.element.append(this.categoriesCardsWrapper.element);
    this.render();
  }

  render() {
    this.categoriesCardsWrapper.element.innerHTML = '';
    if (this.type === CategoriesTypes.artists) {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((el) => {
        let card = new CategoriesCard(
          el,
          this.getCategoryScore(el)
        ).element;
        card.setAttribute('id', el.toString());
        card.style.backgroundImage = `url(./cat${el}.webp)`;
        if (this.getCategoryScore(el) !== -1) {
          card.classList.add('colored');
        }
        this.categoriesCardsWrapper.element.append(card);
      });
    }

    if (this.type === CategoriesTypes.pictures) {
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((el) => {
        let card = new CategoriesCard(
          el,
          this.getCategoryScore(el)
        ).element;
        card.setAttribute('id', el.toString());
        card.style.backgroundImage = `url(./cat${el + 12}.webp)`;
        if (this.getCategoryScore(el) !== -1) {
          card.classList.add('colored');
        }
        this.categoriesCardsWrapper.element.append(card);
      });
    }
  }

  getCategoryScore(category: number) {
    if (localStorage.getItem('score')) {
      let score = JSON.parse(localStorage.getItem('score') as string);
      if (score[this.type][category]) {
        return score[this.type][category].filter((el: boolean) => el).length;
      } else {
        return -1;
      }
    }
  }
}
