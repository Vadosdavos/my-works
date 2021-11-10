import { MainPage } from '../components/main-page/main-page';
import { Settings } from '../components/settings/settings';

export class App {
  private readonly mainPage: MainPage;
  private readonly settings: Settings;

  constructor(private readonly rootElement: HTMLElement) {
    this.mainPage = new MainPage();
    this.settings = new Settings();
    this.rootElement.appendChild(this.mainPage.element);
    this.mainPage.settingsButton.element.addEventListener('click', () => {
      this.openSettings();
    });
    this.settings.saveButton.element.addEventListener('click', () => {
      this.openMain();
    });
  }

  openSettings() {
    this.mainPage.element.classList.add('hidden');
    setTimeout(() => {
      this.rootElement.removeChild(this.mainPage.element);
    }, 500);
    this.rootElement.appendChild(this.settings.element);
    setTimeout(() => {
      this.settings.element.classList.remove('hidden');
    }, 0);
  }

  openMain() {
    this.settings.element.classList.add('hidden');
    setTimeout(() => {
      this.rootElement.removeChild(this.settings.element);
    }, 500);
    this.rootElement.appendChild(this.mainPage.element);
    setTimeout(() => {
      this.mainPage.element.classList.remove('hidden');
    }, 0);
  }
}
