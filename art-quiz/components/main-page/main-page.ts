import { BaseComponent } from '../base-component';
import { MainCard } from '../main-card/main-card';
import './main-page.scss';

export class MainPage extends BaseComponent {
  artist = new MainCard('artist-card', 'Artists quiz');
  pictures = new MainCard('picture-card', 'Pictures quiz');
  title = new BaseComponent('h1', ['main-title'], 'ArtQuiz');

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
  }
}
