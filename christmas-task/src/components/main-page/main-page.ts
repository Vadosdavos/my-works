import './main-page.scss';
import { BaseComponent } from '../base-componet';

export class MainPage extends BaseComponent {
  title = new BaseComponent(
    'div',
    ['main-title'],
    'Новогодняя игра «Наряди ёлку»',
  );

  startButton = new BaseComponent('button', ['start-button'], 'Начать');

  constructor() {
    super('main', ['main-page']);
    this.render();
  }

  public render(): void {
    this.element.append(this.title.element, this.startButton.element);
  }
}
