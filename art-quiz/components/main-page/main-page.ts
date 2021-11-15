import { BaseComponent } from '../base-component';
import { MainCard } from '../main-card/main-card';
import { PageTitle } from '../title/page-title';
import './main-page.scss';

export class MainPage extends BaseComponent {
  artist = new MainCard('artist-card', 'Artists quiz');
  pictures = new MainCard('picture-card', 'Pictures quiz');
  title: PageTitle;

  settingsButton = new BaseComponent(
    'button',
    ['button', 'settings-button'],
    'Настройки'
  );

  constructor() {
    super('section', ['main-page']);
    this.title = new PageTitle();
    this.element.append(
      this.title.element,
      this.artist.element,
      this.pictures.element,
      this.settingsButton.element
    );
  }
}
