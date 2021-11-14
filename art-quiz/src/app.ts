import { Categories } from '../components/categories/categories';
import { CategoriesTypes } from '../components/categories/categories.type';
import { MainPage } from '../components/main-page/main-page';
import { QuestionPage } from '../components/question-page/question-page';
import { Settings } from '../components/settings/settings';

export class App {
  mainPage: MainPage;
  settings: Settings;
  artistsCategories: Categories;
  picturesCategories: Categories;
  artistsQuestionPage: QuestionPage;
  pictureQuestionPage: QuestionPage;

  constructor(private readonly rootElement: HTMLElement) {
    this.mainPage = new MainPage();
    this.settings = new Settings();
    this.artistsCategories = new Categories(CategoriesTypes.artists);
    this.picturesCategories = new Categories(CategoriesTypes.pictures);
    this.artistsQuestionPage = new QuestionPage(CategoriesTypes.artists);
    this.pictureQuestionPage = new QuestionPage(CategoriesTypes.pictures);
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
    this.artistsCategories.categoriesCardsWrapper.element.addEventListener(
      'click',
      (event: MouseEvent) => {
        const target = event.target as HTMLDivElement;
        if (target.className === 'categories-card') {
          this.openQuestion(CategoriesTypes.artists);
        }
      }
    );
    this.picturesCategories.categoriesCardsWrapper.element.addEventListener(
      'click',
      (event: MouseEvent) => {
        const target = event.target as HTMLDivElement;
        if (target.className === 'categories-card') {
          this.openQuestion(CategoriesTypes.pictures);
        }
      }
    );
    this.artistsQuestionPage.categoriesButton.element.addEventListener(
      'click',
      () => {
        this.openCategories(this.artistsCategories);
      }
    );
    this.pictureQuestionPage.categoriesButton.element.addEventListener(
      'click',
      () => {
        this.openCategories(this.picturesCategories);
      }
    );
    this.artistsQuestionPage.homeButton.element.addEventListener(
      'click',
      () => {
        this.goToMainPage();
      }
    );
    this.pictureQuestionPage.homeButton.element.addEventListener(
      'click',
      () => {
        this.goToMainPage();
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
}
