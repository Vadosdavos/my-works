import { Categories } from '../components/categories/categories';
import { CategoriesTypes } from '../components/categories/categories.type';
import { MainPage } from '../components/main-page/main-page';
import { Settings } from '../components/settings/settings';

export class App {
  mainPage: MainPage;
  settings: Settings;
  artistsCategories: Categories;
  picturesCategories: Categories;

  constructor(private readonly rootElement: HTMLElement) {
    this.mainPage = new MainPage();
    this.settings = new Settings();
    this.artistsCategories = new Categories(CategoriesTypes.artists);
    this.picturesCategories = new Categories(CategoriesTypes.pictures);
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
}
