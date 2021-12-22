import { BaseComponent } from '../base-componet';
import { Settings } from '../tree-settings/tree-settings';
import data, { IDataType } from '../../data';
import './tree-page.scss';

export class TreePage extends BaseComponent {
  toyData = data;

  treeSettings = new Settings();

  treeContainer = new BaseComponent('div', ['tree-container']);

  bookmarksContainer = new BaseComponent('div', ['bookmarks-container']);

  constructor() {
    super('div', ['tree-page']);
    // this.render();
  }

  public render(): void {
    this.element.append(
      this.treeSettings.element,
      this.treeContainer.element,
      this.bookmarksContainer.element,
    );
    this.choseBackground();
    this.renderBookedCards();
  }

  private choseBackground(): void {
    const bgsArray = Array.from(
      this.treeSettings.bgTypeContainer.element.children,
    );
    bgsArray.forEach((el) => {
      el.addEventListener('click', () => {
        const bgStyle = <string>el.getAttribute('style');
        this.treeContainer.element.setAttribute('style', bgStyle);
      });
    });
  }

  private renderBookedCards(): void {
    this.bookmarksContainer.element.innerHTML = '';
    const bookedCards: number[] = JSON.parse(
      localStorage.getItem('bookmarks') as string,
    );
    bookedCards.forEach((el) => {
      const card = new BaseComponent('div', ['booked-toy-card']);
      const cardImg = new BaseComponent('img', ['toy-image']);
      const cardAmount = new BaseComponent('div', ['toy-amount']);
      cardImg.element.setAttribute('src', `${el}.png`);
      if (this.toyData[el - 1]) {
        cardAmount.element.textContent = `${this.toyData[el - 1].count}`;
      }
      card.element.append(cardImg.element, cardAmount.element);
      this.bookmarksContainer.element.append(card.element);
    });
  }
}
