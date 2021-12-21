import { BaseComponent } from '../base-componet';
import { Settings } from '../tree-settings/tree-settings';
import './tree-page.scss';

export class TreePage extends BaseComponent {
  treeSettings = new Settings();

  treeContainer = new BaseComponent('div', ['tree-container']);

  bookmarksContainer = new BaseComponent(
    'div',
    ['bookmarks-container'],
    'books',
  );

  constructor() {
    super('div', ['tree-page']);
    this.render();
  }

  private render(): void {
    this.element.append(
      this.treeSettings.element,
      this.treeContainer.element,
      this.bookmarksContainer.element,
    );
    this.choseBackground();
  }

  private choseBackground(): void {
    Array.from(this.treeSettings.bgTypeContainer.element.children).forEach(
      (el) => {
        el.addEventListener('click', () => {
          this.treeContainer.element.setAttribute(
            'style',
            el.getAttribute('style') as string,
          );
        });
      },
    );
  }
}
