import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { MainPage } from './components/main-page/main-page';

export class App {
  header = new Header();
  mainPage = new MainPage();
  footer = new Footer();

  constructor(private readonly rootElement: HTMLElement) {
    this.rootElement.append(
      this.header.element,
      this.mainPage.element,
      this.footer.element
    );
  }
}
