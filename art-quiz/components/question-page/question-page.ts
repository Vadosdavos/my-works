import { BaseComponent } from '../base-component';
import { CategoriesTypes, ImagesData } from '../categories/categories.type';
import { Popup } from '../popup/popup';
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
  curQuestionNumber: number;

  constructor(
    type: CategoriesTypes,
    questionsArr: ImagesData[],
    fullData: ImagesData[],
    curNumber: number
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
    this.curQuestionNumber = curNumber;
    this.element.prepend(this.homeButton.element);
    this.element.append(this.title.element);
    this.element.append(this.categoriesButton.element);
    this.questionWrapper = new BaseComponent('div', ['question-wrapper']);
    this.element.append(this.questionWrapper.element);
    if (this.questionsArr.length > 0) {
      if (this.type === CategoriesTypes.artists) {
        this.questionWrapper.element.classList.add('artists-question-wrapper');
        this.questionWrapper.element.append(
          ...this.createArtistsQuestions(this.curQuestionNumber)
        );
      } else if (this.type === CategoriesTypes.pictures) {
        this.questionWrapper.element.classList.add('pictures-question-wrapper');
        this.questionWrapper.element.append(this.createPicturesQuestions());
      }
    }

    this.questionWrapper.element.childNodes[1]?.childNodes.forEach((el) => {
      el.addEventListener('click', () => {
        this.checkAnswer(el, this.curQuestionNumber);
      });
    });
  }

  createArtistsQuestions(currentNum: number) {
    const artistsImageContainer = new BaseComponent('div', [
      'artist-image-container',
    ]);
    const artistsImage = new BaseComponent<HTMLImageElement>('img', [
      'question-image',
      'artist-image',
    ]);
    console.log(this.questionsArr);
    artistsImage.element.src = `https://raw.githubusercontent.com/Vadosdavos/art-quiz-data/main/full/${this.questionsArr[currentNum].imageNum}full.webp`;
    artistsImage.element.alt = 'Question image';
    artistsImage.element.addEventListener('load', () =>
      artistsImageContainer.element.append(artistsImage.element)
    );
    const artistAnswersContainer = new BaseComponent('div', [
      'artist-answers-container',
    ]);
    let artistsAnswersArr: ImagesData[] = [];
    artistsAnswersArr.push(this.questionsArr[currentNum]);
    while (artistsAnswersArr.length < 4) {
      let number = Math.floor(Math.random() * this.fullData.length);
      if (number !== currentNum) {
        artistsAnswersArr.push(this.fullData[number]);
      }
    }
    artistsAnswersArr
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
    let picturesAnswersArr = [];
    picturesAnswersArr.push(this.questionsArr[+this.element.id]);
    for (let i = 0; i < 3; i++) {
      picturesAnswersArr.push(
        this.fullData[Math.floor(Math.random() * this.fullData.length)]
      );
    }
    picturesAnswersArr
      .sort(() => Math.random() - 0.5)
      .forEach((el) => {
        const picturesImage = new BaseComponent<HTMLImageElement>('img', [
          'question-image',
          'pictures-image',
        ]);
        picturesImage.element.src = `https://raw.githubusercontent.com/Vadosdavos/art-quiz-data/main/full/${el.imageNum}full.webp`;
        picturesImage.element.alt = 'Answer option image';
        picturesImageContainer.element.append(picturesImage.element);
      });
    return picturesImageContainer.element;
  }

  checkAnswer(answerElement: Node | null, currentNum: number) {
    if (answerElement?.textContent === this.questionsArr[currentNum].author) {
      console.log('true');
      (answerElement as HTMLElement).style.backgroundColor =
        'rgba(0, 102, 53, 0.5)';
      const newPopup = new Popup(this.questionsArr[currentNum]);
      this.element.append(newPopup.element);
    } else {
      console.log('false');
      (answerElement as HTMLElement).style.backgroundColor =
        'rgba(102, 0, 51, 0.5)';
    }
  }

  choseCorrect(answerElement: Node) {
    (answerElement as HTMLElement).style.backgroundColor = 'green';
  }
  choseWrong(answerElement: Node) {
    (answerElement as HTMLElement).style.backgroundColor = 'green';
  }
}
