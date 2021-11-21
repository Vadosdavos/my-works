import { Categories } from './components/categories/categories';
import {
  CategoriesTypes,
  ImagesData,
} from './components/categories/categories.type';
import { MainPage } from './components/main-page/main-page';
import { QuestionPage } from './components/question-page/question-page';
import { Score } from './components/score/score';
import { Settings } from './components/settings/settings';

export class App {
  mainPage: MainPage;

  settings: Settings;

  artistsCategories: Categories;

  picturesCategories: Categories;

  artistsQuestionPage: QuestionPage;

  pictureQuestionPage: QuestionPage;

  score: Score;

  constructor(private readonly rootElement: HTMLElement) {
    this.setLocalStorage();
    this.mainPage = new MainPage();
    this.settings = new Settings();
    this.artistsCategories = new Categories(CategoriesTypes.artists);
    this.picturesCategories = new Categories(CategoriesTypes.pictures);
    this.artistsQuestionPage = new QuestionPage(
      CategoriesTypes.artists,
      [],
      [],
      0,
      0,
    );
    this.pictureQuestionPage = new QuestionPage(
      CategoriesTypes.pictures,
      [],
      [],
      0,
      0,
    );
    this.score = new Score();
    this.rootElement.appendChild(this.mainPage.element);
    this.mainPage.settingsButton.element.addEventListener('click', () => {
      this.openSettings();
    });
    this.settings.saveButton.element.addEventListener('click', () => {
      this.openMain();
    });
    this.mainPage.artist.element.addEventListener('click', () => {
      this.openCategories(this.artistsCategories);
    });
    this.mainPage.pictures.element.addEventListener('click', () => {
      this.openCategories(this.picturesCategories);
    });
    this.artistsCategories.homeButton.element.addEventListener('click', () => {
      this.goToMainPage();
    });
    this.picturesCategories.homeButton.element.addEventListener('click', () => {
      this.goToMainPage();
    });
    this.score.homeButton.element.addEventListener('click', () => {
      this.goToMainPage();
    });
    this.getImagesData().then(
      (data) => {
        this.renderCards(data);
      },
      (err) => {
        if (err) throw new Error('Json is not found!');
      },
    );
  }

  clearPage() {
    this.rootElement.innerHTML = '';
  }

  openCategories(type: Categories) {
    this.clearPage();
    type.render();
    this.rootElement.appendChild(type.element);
  }

  renderCards(data: ImagesData[]) {
    const artistData = data.slice(0, 120);
    const picturesData = data.slice(120);
    this.artistsCategories.categoriesCardsWrapper.element.addEventListener(
      'click',
      (event: MouseEvent) => {
        const target = event.target as HTMLDivElement;
        if (target.className.includes('categories-card')) {
          this.artistsQuestionPage = new QuestionPage(
            CategoriesTypes.artists,
            artistData.slice((+target.id - 1) * 10, +target.id * 10),
            data,
            0,
            +target.id,
          );
          this.artistsQuestionPage.categoriesButton.element.addEventListener(
            'click',
            () => {
              this.openCategories(this.artistsCategories);
            },
          );
          this.artistsQuestionPage.homeButton.element.addEventListener(
            'click',
            () => {
              this.goToMainPage();
            },
          );
          this.artistsQuestionPage.endRound.homeButton.element.addEventListener(
            'click',
            () => {
              this.goToMainPage();
            },
          );
          this.artistsQuestionPage.endRound.categoriesButton.element.addEventListener(
            'click',
            () => {
              this.openCategories(this.artistsCategories);
            },
          );
          this.openQuestion(CategoriesTypes.artists);
        } else if (target.className === 'score-button') {
          const categoryDataArr = artistData.slice(
            (+target.id[0] - 1) * 10,
            +target.id[0] * 10,
          );
          this.openScore(
            +target.id[0],
            categoryDataArr,
            CategoriesTypes.artists,
          );
        }
      },
    );
    this.picturesCategories.categoriesCardsWrapper.element.addEventListener(
      'click',
      (event: MouseEvent) => {
        const target = event.target as HTMLDivElement;
        if (target.className.includes('categories-card')) {
          this.pictureQuestionPage = new QuestionPage(
            CategoriesTypes.pictures,
            picturesData.slice((+target.id - 1) * 10, +target.id * 10),
            data,
            0,
            +target.id,
          );
          this.pictureQuestionPage.categoriesButton.element.addEventListener(
            'click',
            () => {
              this.openCategories(this.picturesCategories);
            },
          );
          this.pictureQuestionPage.homeButton.element.addEventListener(
            'click',
            () => {
              this.goToMainPage();
            },
          );
          this.pictureQuestionPage.endRound.homeButton.element.addEventListener(
            'click',
            () => {
              this.goToMainPage();
            },
          );
          this.pictureQuestionPage.endRound.categoriesButton.element.addEventListener(
            'click',
            () => {
              this.openCategories(this.picturesCategories);
            },
          );
          this.openQuestion(CategoriesTypes.pictures);
        } else if (target.className === 'score-button') {
          const categoryDataArr = picturesData.slice(
            (+target.id[0] - 1) * 10,
            +target.id[0] * 10,
          );
          this.openScore(
            +target.id[0],
            categoryDataArr,
            CategoriesTypes.pictures,
          );
        }
      },
    );
  }

  goToMainPage() {
    this.clearPage();
    this.rootElement.append(this.mainPage.element);
  }

  openSettings() {
    this.mainPage.element.classList.add('hidden');
    this.rootElement.removeChild(this.mainPage.element);
    this.rootElement.appendChild(this.settings.element);
    setTimeout(() => {
      this.settings.element.classList.remove('hidden');
    }, 0);
  }

  openMain() {
    this.settings.element.classList.add('hidden');
    this.rootElement.removeChild(this.settings.element);
    this.rootElement.appendChild(this.mainPage.element);
    setTimeout(() => {
      this.mainPage.element.classList.remove('hidden');
    }, 0);
  }

  openQuestion(type: CategoriesTypes) {
    this.clearPage();
    if (type === CategoriesTypes.artists) {
      this.rootElement.append(this.artistsQuestionPage.element);
    } else this.rootElement.append(this.pictureQuestionPage.element);
  }

  openScore(
    categoryNum: number,
    categoryDataArr: ImagesData[],
    type: CategoriesTypes,
  ) {
    this.clearPage();
    this.score.categoriesButton.element.addEventListener('click', () => {
      this.openCategories(
        type === 'artists' ? this.artistsCategories : this.picturesCategories,
      );
    });
    this.score.render(categoryNum, categoryDataArr, type);
    this.rootElement.append(this.score.element);
  }

  async getImagesData() {
    const res = await fetch('./images.json');
    const data = await res.json();
    return data;
  }

  setLocalStorage() {
    if (!localStorage.getItem('score')) {
      localStorage.setItem(
        'score',
        JSON.stringify({
          artists: {},
          pictures: {},
        }),
      );
    }
  }
}
