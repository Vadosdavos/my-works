import { Categories } from '../components/categories/categories';
import { CategoriesTypes } from '../components/categories/categories.type';
import { MainPage } from '../components/main-page/main-page';
import { QuestionPage } from '../components/question-page/question-page';
import { Score } from '../components/score/score';
import { Settings } from '../components/settings/settings';

export class App {
  mainPage: MainPage;

  settings: Settings;

  artistsCategories: Categories;

  picturesCategories: Categories;

  artistsQuestionPage: QuestionPage;

  pictureQuestionPage: QuestionPage;

  score: Score;

  constructor(private readonly rootElement: HTMLElement) {
    this.mainPage = new MainPage();
    this.settings = new Settings();
    this.artistsCategories = new Categories(CategoriesTypes.artists);
    this.picturesCategories = new Categories(CategoriesTypes.pictures);
    this.artistsQuestionPage = new QuestionPage(
      CategoriesTypes.artists,
      [],
      [],
      0
    );
    this.pictureQuestionPage = new QuestionPage(
      CategoriesTypes.pictures,
      [],
      [],
      0
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
    // ДОБАВИТЬ ВОЗВРАТЬ В НУЖНУЮ КАТЕГОРИЮ
    this.score.categoriesButton.element.addEventListener('click', () => {
      this.openCategories(this.picturesCategories);
    });
    this.getImagesData().then(
      (data) => {
        const artistData = data.slice(0, 120);
        const picturesData = data.slice(120);
        this.artistsCategories.categoriesCardsWrapper.element.addEventListener(
          'click',
          (event: MouseEvent) => {
            const target = event.target as HTMLDivElement;
            if (target.className === 'categories-card') {
              this.artistsQuestionPage = new QuestionPage(
                CategoriesTypes.artists,
                artistData.slice((+target.id - 1) * 10, +target.id * 10),
                data,
                0
              );
              this.artistsQuestionPage.categoriesButton.element.addEventListener(
                'click',
                () => {
                  this.openCategories(this.artistsCategories);
                }
              );
              this.artistsQuestionPage.homeButton.element.addEventListener(
                'click',
                () => {
                  this.goToMainPage();
                }
              );
              this.artistsQuestionPage.newPopup.nextButton.element.addEventListener(
                'click',
                () => {
                  console.log('qqqqqqqqqqqqqqqqqqqqq');
                }
              );
              this.openQuestion(CategoriesTypes.artists);
            } else if (target.className === 'score-button') {
              this.openScore();
            }
          }
        );
        this.picturesCategories.categoriesCardsWrapper.element.addEventListener(
          'click',
          (event: MouseEvent) => {
            const target = event.target as HTMLDivElement;
            if (target.className === 'categories-card') {
              this.pictureQuestionPage = new QuestionPage(
                CategoriesTypes.pictures,
                picturesData.slice((+target.id - 1) * 10, +target.id * 10),
                data,
                0
              );
              this.pictureQuestionPage.categoriesButton.element.addEventListener(
                'click',
                () => {
                  this.openCategories(this.picturesCategories);
                }
              );
              this.pictureQuestionPage.homeButton.element.addEventListener(
                'click',
                () => {
                  this.goToMainPage();
                }
              );
              this.openQuestion(CategoriesTypes.pictures);
            } else if (target.className === 'score-button') {
              this.openScore();
            }
          }
        );
      },
      (err) => {
        if (err) throw new Error('Json is not found!');
      }
    );
  }

  clearPage() {
    this.rootElement.innerHTML = '';
  }

  openCategories(type: Categories) {
    this.clearPage();
    this.rootElement.appendChild(type.element);
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

  openScore() {
    this.clearPage();
    this.rootElement.append(this.score.element);
  }

  async getImagesData() {
    const res = await fetch('./images.json');
    const data = await res.json();
    return data;
  }
}
