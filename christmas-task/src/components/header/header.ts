import './header.scss';
import { BaseComponent } from '../base-componet';

export class Header extends BaseComponent {
  logo = new BaseComponent('span', ['logo']);
  toysButton = new BaseComponent('span', ['toys-button'], 'Игрушки');
  treeButton = new BaseComponent('span', ['tree-button'], 'Ёлка');

  constructor() {
    super('header', ['main-header']);
    this.element.append(
      this.logo.element,
      this.toysButton.element,
      this.treeButton.element
    );
  }
}
