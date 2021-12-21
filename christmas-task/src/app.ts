import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { MainPage } from './components/main-page/main-page';
import { ToysPage } from './components/toys-page/toys-page';
import { TreePage } from './components/tree-page/tree-page';

export class App {
  header = new Header();

  mainPage = new MainPage();

  footer = new Footer();

  toysPage = new ToysPage();

  treePage = new TreePage();

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
    this.header.treeButton.element.addEventListener('click', () => {
      this.clearPage();
      this.openTreePage();
    });
    this.mainPage.startButton.element.addEventListener('click', () => {
      this.clearPage();
      this.openToysPage();
    });
  }

  private clearPage(): void {
    this.mainPage.element.innerHTML = '';
    this.header.toysButton.element.classList.remove('active');
    this.header.treeButton.element.classList.remove('active');
  }

  private openToysPage(): void {
    this.mainPage.element.append(this.toysPage.element);
    this.header.toysButton.element.classList.add('active');
  }

  private openTreePage(): void {
    this.mainPage.element.append(this.treePage.element);
    this.header.treeButton.element.classList.add('active');
  }
}
