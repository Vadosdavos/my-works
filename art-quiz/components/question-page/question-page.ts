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
        this.questionWrapper.element.append(
          this.createPicturesQuestions(this.curQuestionNumber)
        );
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
    artistsImage.element.src = `https://raw.githubusercontent.com/Vadosdavos/art-quiz-data/main/full/${this.questionsArr[currentNum].imageNum}full.webp`;
    artistsImage.element.alt = 'Question image';
    artistsImage.element.addEventListener('load', () =>
      artistsImageContainer.element.append(artistsImage.element)
    );
    const artistAnswersContainer = new BaseComponent('div', [
      'artist-answers-container',
    ]);
    let artistsAnswersArr: ImagesData[] = [];
    let checkArr: number[] = [];
    artistsAnswersArr.push(this.questionsArr[currentNum]);
    checkArr.push(+this.questionsArr[currentNum].imageNum);
    while (artistsAnswersArr.length < 4) {
      let number = Math.floor(Math.random() * this.fullData.length);
      if (!checkArr.includes(number)) {
        artistsAnswersArr.push(this.fullData[number]);
        checkArr.push(number);
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
  createPicturesQuestions(currentNum: number) {
    const picturesImageContainer = new BaseComponent('div', [
      'pictures-image-container',
    ]);
    let picturesAnswersArr: ImagesData[] = [];
    let checkArr: number[] = [];
    picturesAnswersArr.push(this.questionsArr[currentNum]);
    checkArr.push(+this.questionsArr[currentNum].imageNum);
    while (picturesAnswersArr.length < 4) {
      let number = Math.floor(Math.random() * this.fullData.length);
      if (!checkArr.includes(number)) {
        picturesAnswersArr.push(this.fullData[number]);
        checkArr.push(number);
      }
    }
    picturesAnswersArr
      .sort(() => Math.random() - 0.5)
      .forEach((el) => {
        const picturesImage = new BaseComponent<HTMLImageElement>('img', [
          'question-image',
          'pictures-image',
        ]);
        picturesImage.element.src = `https://raw.githubusercontent.com/Vadosdavos/art-quiz-data/main/img/${el.imageNum}.webp`;
        picturesImage.element.alt = 'Answer option image';
        picturesImageContainer.element.append(picturesImage.element);
      });
    return picturesImageContainer.element;
  }

  checkAnswer(answerElement: Node | null, currentNum: number) {
    if (answerElement?.textContent === this.questionsArr[currentNum].author) {
      (answerElement as HTMLElement).style.backgroundColor =
        'rgba(0, 102, 53, 0.5)';
      const newPopup = new Popup(this.questionsArr[currentNum], true);
      this.element.append(newPopup.element);
      newPopup.nextButton.element.addEventListener('click', () => {
        this.element.innerHTML = '';
        this.element.append(
          new QuestionPage(
            this.type,
            this.questionsArr,
            this.fullData,
            this.curQuestionNumber + 1
          ).element
        );
      });
    } else {
      (answerElement as HTMLElement).style.backgroundColor =
        'rgba(102, 0, 51, 0.5)';
      const newPopup = new Popup(this.questionsArr[currentNum], false);
      this.element.append(newPopup.element);
      newPopup.nextButton.element.addEventListener('click', () => {
        this.element.innerHTML = '';
        this.element.append(
          new QuestionPage(
            this.type,
            this.questionsArr,
            this.fullData,
            this.curQuestionNumber + 1
          ).element
        );
      });
    }
  }
}
