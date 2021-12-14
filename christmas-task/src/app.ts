import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { MainPage } from './components/main-page/main-page';
import { ToysPage } from './components/toys-page/toys-page';

export class App {
  header = new Header();

  mainPage = new MainPage();

  footer = new Footer();

  toysPage = new ToysPage();

  constructor(private readonly rootElement: HTMLElement) {
    this.rootElement.append(
      this.header.element,
      this.mainPage.element,
      this.footer.element,
    );
    this.header.toysButton.element.addEventListener('click', () => {
      this.clearPage();
      this.openToysPage();
    });
    this.header.logo.element.addEventListener('click', () => {
      this.clearPage();
      this.mainPage.render();
    });
    this.mainPage.startButton.element.addEventListener('click', () => {
      this.clearPage();
      this.openToysPage();
    });
    this.openToysPage(); // Убрать потом
  }

  clearPage() {
    this.mainPage.element.innerHTML = '';
    this.header.toysButton.element.classList.remove('active');
  }

  openToysPage() {
    this.mainPage.element.append(this.toysPage.element);
    this.header.toysButton.element.classList.add('active');
  }
}
