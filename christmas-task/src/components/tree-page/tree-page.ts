import { BaseComponent } from '../base-componet';
import { Settings } from '../tree-settings/tree-settings';
import './tree-page.scss';

export class TreePage extends BaseComponent {
  treeSettings = new Settings();

  treeContainer = new BaseComponent('div', ['tree-container'], 'tree');

  bookmarksContainer = new BaseComponent(
    'div',
    ['bookmarks-container'],
    'books',
  );

  constructor() {
    super('div', ['tree-page']);
    this.render();
    Array.from(this.treeSettings.treeTypeContainer.element.children).forEach(
      (el) => {
        el.addEventListener('click', () => {
          console.log(el.getAttribute('style'));
        });
      },
    );
  }

  public render(): void {
    this.element.append(
      this.treeSettings.element,
      this.treeContainer.element,
      this.bookmarksContainer.element,
    );
  }
}
