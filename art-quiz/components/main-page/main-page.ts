import { BaseComponent } from '../base-component';
import { CategoriesTypes } from '../categories-field/categories-field';
import { Categories } from '../categories/categories';
import { MainCard } from '../main-card/main-card';
import './main-page.scss';

export class MainPage extends BaseComponent {
  artist = new MainCard('artist-card', 'Artists quiz');
  pictures = new MainCard('picture-card', 'Pictures quiz');
  title = new BaseComponent('h1', ['main-title'], 'ArtQuiz');
  homeButton = new BaseComponent(
    'button',
    ['button', 'home-button'],
    'На главную'
  );
  artistsCategories = new Categories(CategoriesTypes.artists);
  picturesCategories = new Categories(CategoriesTypes.pictures);
  settingsButton = new BaseComponent(
    'button',
    ['button', 'settings-button'],
    'Настройки'
  );

  constructor() {
    super('section', ['main-page']);
    this.element.append(
      this.title.element,
      this.artist.element,
      this.pictures.element,
      this.settingsButton.element
    );
    this.artist.element.addEventListener('click', () => {
      this.openCategories(this.artistsCategories);
    });
    this.pictures.element.addEventListener('click', () => {
      this.openCategories(this.picturesCategories);
    });
    this.homeButton.element.addEventListener('click', () => {
      this.goToMainPage();
    });
  }

  openCategories(type: Categories) {
    this.element.removeChild(this.artist.element);
    this.element.removeChild(this.pictures.element);
    this.element.removeChild(this.title.element);
    this.element.removeChild(this.settingsButton.element);
    this.element.appendChild(type.element);
    this.element.appendChild(this.homeButton.element);
  }

  goToMainPage() {
    this.picturesCategories.element.remove();
    this.artistsCategories.element.remove();
    this.homeButton.element.remove();
    this.element.append(
      this.artist.element,
      this.pictures.element,
      this.title.element,
      this.settingsButton.element
    );
  }
}
