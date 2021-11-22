import { settings } from '../../app';
import {
  playAudio,
  playCorrect,
  playFinish,
  playWrong,
} from '../../utils/play-audio';
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
    'На главную',
  );

  categoriesButton = new BaseComponent(
    'button',
    ['button', 'categ-button'],
    'Категории',
  );

  questionWrapper = new BaseComponent('div', ['question-wrapper']);

  type: CategoriesTypes;

  questionsArr: ImagesData[];

  fullData: ImagesData[];

  curQuestionNumber: number;

  newPopup: Popup | undefined;

  endRound: EndroundPopup;

  curCategory: number;

  scoreRadiosContainer = new BaseComponent('div', ['score-rad-container']);

  timer = new BaseComponent('div', ['question-timer']);

  constructor(
    type: CategoriesTypes,
    questionsArr: ImagesData[],
    fullData: ImagesData[],
    curNumber: number,
    curCategory: number,
  ) {
    super('section', ['question-page']);
    this.curCategory = curCategory;
    this.curQuestionNumber = curNumber;
    this.type = type;
    this.questionsArr = questionsArr;
    this.fullData = fullData;
    this.endRound = new EndroundPopup();
    this.timer.element.textContent = '20';
    this.render(this.curQuestionNumber);
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
          ...this.createArtistsQuestion(curNumber),
        );
      } else if (this.type === CategoriesTypes.pictures) {
        this.questionWrapper.element.classList.add('pictures-question-wrapper');
        this.questionWrapper.element.append(
          this.createPicturesQuestion(curNumber),
        );
      }
      if (settings.timer) {
        this.setTimer();
      }
      this.newPopup = new Popup(this.questionsArr[curNumber]);
      this.newPopup.nextButton.element.addEventListener('click', () => {
        if (curNumber <= 8) {
          playAudio();
          this.element.innerHTML = '';
          this.curQuestionNumber++;
          this.render(this.curQuestionNumber);
        } else {
          this.endRound.typeScore(this.getCategoryScore());
          this.element.append(this.endRound.element);
          playFinish();
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

  createScoreIndicators(scoreArr: boolean[], curQuestion: number) {
    this.scoreRadiosContainer = new BaseComponent('div', [
      'score-rad-container',
    ]);
    for (let i = 0; i < 10; i++) {
      const circle = new BaseComponent('div', ['circle']);
      if (i < curQuestion) {
        if (scoreArr && scoreArr[i]) {
          circle.element.style.backgroundColor = 'green';
        } else {
          circle.element.style.backgroundColor = 'red';
        }
      }
      this.scoreRadiosContainer.element.append(circle.element);
    }
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
    artistsImage.element.addEventListener('load', () => {
      this.createScoreIndicators(
        this.getQuestionResult(),
        this.curQuestionNumber,
      );
      artistsImageContainer.element.append(
        artistsImage.element,
        this.scoreRadiosContainer.element,
      );
    });
    const artistAnswersContainer = new BaseComponent('div', [
      'artist-answers-container',
    ]);
    const artistsAnswersArr: ImagesData[] = [];
    const checkArr: string[] = [];
    artistsAnswersArr.push(this.questionsArr[currentNum]);
    checkArr.push(this.questionsArr[currentNum].author);
    while (artistsAnswersArr.length < 4) {
      const number = Math.floor(Math.random() * this.fullData.length);
      if (!checkArr.includes(this.fullData[number].author)) {
        artistsAnswersArr.push(this.fullData[number]);
        checkArr.push(this.fullData[number].author);
      }
    }
    artistsAnswersArr
      .sort(() => Math.random() - 0.5)
      .forEach((el) =>
        artistAnswersContainer.element.append(
          new BaseComponent('p', ['artist-answers'], `${el.author}`).element,
        ),
      );
    return [artistsImageContainer.element, artistAnswersContainer.element];
  }

  createPicturesQuestion(currentNum: number) {
    const picturesImageContainer = new BaseComponent('div', [
      'pictures-image-container',
    ]);
    const picturesAnswersArr: ImagesData[] = [];
    const checkArr: string[] = [];
    picturesAnswersArr.push(this.questionsArr[currentNum]);
    checkArr.push(this.questionsArr[currentNum].name);
    while (picturesAnswersArr.length < 4) {
      const number = Math.floor(Math.random() * this.fullData.length);
      if (!checkArr.includes(this.fullData[number].name)) {
        picturesAnswersArr.push(this.fullData[number]);
        checkArr.push(this.fullData[number].name);
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
    this.createScoreIndicators(
      this.getQuestionResult(),
      this.curQuestionNumber,
    );
    picturesImageContainer.element.append(this.scoreRadiosContainer.element);
    return picturesImageContainer.element;
  }

  checkAnswer(answerElement: Node | null, currentNum: number) {
    if (this.newPopup) {
      this.removeTimer();
      if (this.type === 'artists') {
        if (
          answerElement?.textContent === this.questionsArr[currentNum].author
        ) {
          playCorrect();
          (answerElement as HTMLElement).style.backgroundColor =
            'rgba(0, 102, 53, 0.5)';
          this.newPopup.check.element.classList.add('correct');
          this.element.append(this.newPopup.element);
          this.updateScore(true);
        } else {
          playWrong();
          (answerElement as HTMLElement).style.backgroundColor =
            'rgba(102, 0, 51, 0.5)';
          this.newPopup.check.element.classList.add('wrong');
          this.element.append(this.newPopup.element);
          this.updateScore(false);
        }
      } else {
        if (
          (answerElement as HTMLElement).id ===
          this.questionsArr[currentNum].author
        ) {
          playCorrect();
          this.newPopup.check.element.classList.add('correct');
          this.element.append(this.newPopup.element);
          this.updateScore(true);
        } else {
          playWrong();
          this.newPopup.check.element.classList.add('wrong');
          this.element.append(this.newPopup.element);
          this.updateScore(false);
        }
      }
    }
  }

  getQuestionResult() {
    if (localStorage.getItem('score')) {
      const score = JSON.parse(localStorage.getItem('score') as string);
      return score[this.type][this.curCategory];
    }
  }

  updateScore(isCorrect: boolean) {
    const score = JSON.parse(localStorage.getItem('score') as string);
    if (!score[this.type][this.curCategory]) {
      score[this.type][this.curCategory] = [];
    }
    score[this.type][this.curCategory][this.curQuestionNumber] = isCorrect;
    localStorage.setItem('score', JSON.stringify(score));
  }

  getCategoryScore() {
    if (localStorage.getItem('score')) {
      const score = JSON.parse(localStorage.getItem('score') as string);
      return score[this.type][this.curCategory].filter((el: boolean) => el)
        .length;
    }
  }

  async setTimer() {
    this.questionWrapper.element.append(this.timer.element);
    let twenty = 20;
    const countdown = setInterval(() => {
      this.timer.element.textContent = `${twenty}`;
      twenty--;
      if (twenty === 0) {
        clearInterval(countdown);
        this.timer.element.textContent = '0';
      }
    }, 1000);
  }

  removeTimer() {
    this.questionWrapper.element.removeChild(this.timer.element);
  }
}
