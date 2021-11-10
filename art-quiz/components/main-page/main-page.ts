import { BaseComponent } from '../base-component';
import { MainCard } from '../main-card/main-card';
import './main-page.scss';

export class MainPage extends BaseComponent {
  Artist = new MainCard('artist-card' ,'Artists quiz');
  Pictures = new MainCard('picture-card','Pictures quiz');
  title = new BaseComponent('h1', ['main-title'], 'ArtQuiz');
  settingsButton = new BaseComponent(
    'button',
    ['button', 'settings-button'],
    'Settings'
  );

  constructor() {
    super('section', ['main-page']);
    this.element.append(
      this.title.element,
      this.Artist.element,
      this.Pictures.element,
      this.settingsButton.element
    );
  }
}
