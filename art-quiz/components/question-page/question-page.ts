import { BaseComponent } from '../base-component';
import { CategoriesTypes, ImagesData } from '../categories/categories.type';
import { EndroundPopup } from '../endround-popup/endround-popup';
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
  questionWrapper = new BaseComponent('div', ['question-wrapper']);
  type: CategoriesTypes;
  questionsArr: ImagesData[];
  fullData: ImagesData[];
  curQuestionNumber: number;
  newPopup: Popup | undefined;

  constructor(
    type: CategoriesTypes,
    questionsArr: ImagesData[],
    fullData: ImagesData[],
    curNumber: number
  ) {
    super('section', ['question-page']);
    this.curQuestionNumber = curNumber;
    this.type = type;
    this.questionsArr = questionsArr;
    this.fullData = fullData;
    this.render(this.curQuestionNumber);
    this.element.append(new EndroundPopup().element);
  }

  render(curNumber: number) {
    this.questionWrapper = new BaseComponent('div', ['question-wrapper']);
    this.element.append(this.questionWrapper.element);
    if (this.questionsArr.length > 0) {
      const titles = {
        artists: 'Кто автор данной картины?',
        pictures: `Какую картину написал ${this.questionsArr[curNumber].author} ?`,
      };
      this.title.element.textContent = titles[this.type];
      this.element.prepend(this.homeButton.element);
      this.element.append(this.title.element);
      this.element.append(this.categoriesButton.element);
      if (this.type === CategoriesTypes.artists) {
        this.questionWrapper.element.classList.add('artists-question-wrapper');
        this.questionWrapper.element.append(
          ...this.createArtistsQuestion(curNumber)
        );
      } else if (this.type === CategoriesTypes.pictures) {
        this.questionWrapper.element.classList.add('pictures-question-wrapper');
        this.questionWrapper.element.append(
          this.createPicturesQuestion(curNumber)
        );
      }
      this.newPopup = new Popup(this.questionsArr[curNumber]);
      this.newPopup.nextButton.element.addEventListener('click', () => {
        if (curNumber <= 8) {
          this.element.innerHTML = '';
          this.curQuestionNumber++;
          this.render(this.curQuestionNumber);
        } else {
          this.element.append(new EndroundPopup().element);
        }
      });
    }
    this.questionWrapper.element.childNodes[1]?.childNodes.forEach((el) => {
      el.addEventListener('click', () => {
        this.checkAnswer(el, curNumber);
      });
    });
    this.questionWrapper.element.childNodes[0]?.childNodes.forEach((el) => {
      el.addEventListener('click', () => {
        this.checkAnswer(el, curNumber);
      });
    });
  }

  createArtistsQuestion(currentNum: number) {
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
  createPicturesQuestion(currentNum: number) {
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
        picturesImage.element.id = `${el.author}`;
        picturesImageContainer.element.append(picturesImage.element);
      });
    return picturesImageContainer.element;
  }

  checkAnswer(answerElement: Node | null, currentNum: number) {
    if (this.newPopup) {
      if (this.type === 'artists') {
        if (
          answerElement?.textContent === this.questionsArr[currentNum].author
        ) {
          (answerElement as HTMLElement).style.backgroundColor =
            'rgba(0, 102, 53, 0.5)';
          this.newPopup.check.element.classList.add('correct');
          this.element.append(this.newPopup.element);
        } else {
          (answerElement as HTMLElement).style.backgroundColor =
            'rgba(102, 0, 51, 0.5)';
          this.newPopup.check.element.classList.add('wrong');
          this.element.append(this.newPopup.element);
        }
      } else {
        if (
          (answerElement as HTMLElement).id ===
          this.questionsArr[currentNum].author
        ) {
          (answerElement as HTMLElement).style.backgroundColor =
            'rgba(0, 102, 53, 0.5)';
          this.newPopup.check.element.classList.add('correct');
          this.element.append(this.newPopup.element);
        } else {
          (answerElement as HTMLElement).style.backgroundColor =
            'rgba(102, 0, 51, 0.5)';
          this.newPopup.check.element.classList.add('wrong');
          this.element.append(this.newPopup.element);
        }
      }
    }
  }
}
