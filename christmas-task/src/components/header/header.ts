import './header.scss';
import { BaseComponent } from '../base-componet';

export class Header extends BaseComponent {
  public logo = new BaseComponent('span', ['logo']);

  public toysButton = new BaseComponent('span', ['toys-button'], 'Игрушки');

  public treeButton = new BaseComponent('span', ['tree-button'], 'Ёлка');

  private headerNav = new BaseComponent('nav', ['header-nav']);

  constructor() {
    super('header', ['main-header']);
    this.headerNav.element.append(
      this.logo.element,
      this.toysButton.element,
      this.treeButton.element,
    );
    this.element.append(this.headerNav.element);
  }
}
