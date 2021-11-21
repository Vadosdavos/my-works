import { BaseComponent } from '../base-component';
import { CategoriesTypes, ImagesData } from '../categories/categories.type';
import { ScoreCard } from '../score-card/score-card';
import { PageTitle } from '../title/page-title';
import './score.scss';

export class Score extends BaseComponent {
  title: PageTitle;
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
    this.title = new PageTitle('Результаты');
    this.element.prepend(this.homeButton.element);
    this.element.append(this.title.element);
    this.element.append(this.categoriesButton.element);
    this.scoreWrapper = new BaseComponent('div', ['score-wrapper']);
    this.render(0, [], CategoriesTypes.artists);
  }

  render(
    categoryNum: number,
    categoryDataArr: ImagesData[],
    type: CategoriesTypes
  ) {

    this.scoreWrapper.element.innerHTML = '';
    categoryDataArr.forEach((el, i) => {
      let card = new ScoreCard(el).element;
      const image = new BaseComponent<HTMLImageElement>('img', ['score-image']);
      image.element.src = `https://raw.githubusercontent.com/Vadosdavos/art-quiz-data/main/full/${+el.imageNum}full.webp`;
      image.element.alt = 'Score image';
      image.element.addEventListener('load', () => {
        card.append(image.element);
        this.scoreWrapper.element.append(card);
      });
      if (localStorage.getItem('score')) {
        let score = JSON.parse(localStorage.getItem('score') as string);
        if (score[type][categoryNum][i]) {
          card.classList.add('colored');
        }
      }
    });
    this.element.append(this.scoreWrapper.element);
  }
}
