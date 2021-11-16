import { BaseComponent } from '../base-component';
import { CategoriesTypes, ImagesData } from '../categories/categories.type';
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
  questionsArr: ImagesData[];
  fullData: ImagesData[];

  constructor(
    type: CategoriesTypes,
    questionsArr: ImagesData[],
    fullData: ImagesData[]
  ) {
    super('section', ['question-page']);
    this.type = type;
    const titles = {
      artists: 'Кто автор данной картины?',
      pictures: 'Какую картину из предложенных написал _____ ?',
    };
    this.questionsArr = questionsArr;
    this.fullData = fullData;
    this.title.element.textContent = titles[type];
    this.element.prepend(this.homeButton.element);
    this.element.append(this.title.element);
    this.element.append(this.categoriesButton.element);
    this.questionWrapper = new BaseComponent('div', ['question-wrapper']);
    this.element.append(this.questionWrapper.element);
    if (this.questionsArr.length > 0) {
      if (this.type === CategoriesTypes.artists) {
        this.questionWrapper.element.classList.add('artists-question-wrapper');
        this.questionWrapper.element.append(...this.createArtistsQuestions());
      } else if (this.type === CategoriesTypes.pictures) {
        this.questionWrapper.element.classList.add('pictures-question-wrapper');
        this.questionWrapper.element.append(this.createPicturesQuestions());
      }
      console.log(this.questionsArr);
    }
  }

  createArtistsQuestions() {
    const artistsImageContainer = new BaseComponent('div', [
      'artist-image-container',
    ]);
    const artistsImage = new BaseComponent<HTMLImageElement>('img', [
      'question-image',
      'artist-image',
    ]);
    console.log(+this.element.id);
    artistsImage.element.src = `https://raw.githubusercontent.com/Vadosdavos/art-quiz-data/main/full/${
      this.questionsArr[+this.element.id].imageNum
    }full.webp`;
    artistsImage.element.alt = 'Question image';
    artistsImage.element.addEventListener('load', () =>
      artistsImageContainer.element.append(artistsImage.element)
    );
    const artistAnswersContainer = new BaseComponent('div', [
      'artist-answers-container',
    ]);
    let answersArr: ImagesData[] = [];
    answersArr.push(this.questionsArr[+this.element.id]);
    for (let i = 0; i < 3; i++) {
      answersArr.push(
        this.fullData[Math.floor(Math.random() * this.fullData.length)]
      );
    }
    console.log(answersArr);
    answersArr
      .sort(() => Math.random() - 0.5)
      .forEach((el) =>
        artistAnswersContainer.element.append(
          new BaseComponent('p', ['artist-answers'], `${el.author}`).element
        )
      );
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
      picturesImage.element.alt = 'Answer option image';
      picturesImageContainer.element.append(picturesImage.element);
    }
    return picturesImageContainer.element;
  }
}
