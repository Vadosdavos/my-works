import { BaseComponent } from '../base-component';
import { CategoriesTypes } from '../categories/categories.type';
import './question-page.scss';

export class QuestionPage extends BaseComponent {
  title = new BaseComponent('h3', ['question-title']);
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
  questionWrapper: BaseComponent;
  type: CategoriesTypes;

  constructor(type: CategoriesTypes) {
    super('section', ['question-page']);
    this.type = type;
    const titles = {
      artists: 'Кто автор данной картины?',
      pictures: 'Какую картину из предложенных написал _____ ?',
    };
    this.title.element.textContent = titles[type];
    this.element.prepend(this.homeButton.element);
    this.element.append(this.title.element);
    this.element.append(this.categoriesButton.element);
    this.questionWrapper = new BaseComponent('div', ['question-wrapper']);
    this.element.append(this.questionWrapper.element);
    if (this.type === CategoriesTypes.artists) {
      this.questionWrapper.element.append(...this.createArtistsQuestions());
    } else if (this.type === CategoriesTypes.pictures) {
      this.questionWrapper.element.append(this.createPicturesQuestions());
    }
  }

  createArtistsQuestions() {
    const artistsImageContainer = new BaseComponent('div', [
      'artist-image-container',
    ]);
    const artistsImage = new BaseComponent<HTMLImageElement>('img', [
      'artist-image',
    ]);
    artistsImage.element.src = './image1.jpg';
    artistsImage.element.alt = 'Question image';
    artistsImageContainer.element.append(artistsImage.element);
    const artistAnswersContainer = new BaseComponent('div', [
      'artist-answers-container',
    ]);
    for (let i = 0; i < 4; i++) {
      artistAnswersContainer.element.append(
        new BaseComponent('p', ['artist-answers'], `test-${i}`).element
      );
    }
    return [artistsImageContainer.element, artistAnswersContainer.element];
  }
  createPicturesQuestions() {
    const picturesImageContainer = new BaseComponent('div', [
      'pictures-image-container',
    ]);
    for (let i = 0; i < 4; i++) {
      const picturesImage = new BaseComponent<HTMLImageElement>('img', [
        'pictures-image',
      ]);
      picturesImage.element.src = `./image${i + 3}.jpg`;
      picturesImage.element.alt = 'Answer Option image';
      picturesImageContainer.element.append(picturesImage.element);
    }
    return picturesImageContainer.element;
  }
}
