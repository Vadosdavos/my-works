import { BaseComponent } from '../base-component';
import './endround-popup.scss';

export class EndroundPopup extends BaseComponent {
  title = new BaseComponent('h3', ['question-title'], 'Поздравляем!');
  homeButton = new BaseComponent(
    'button',
    ['button', 'home-button'],
    'На главную'
  );
  categoriesButton = new BaseComponent(
    'button',
    ['button', 'categ-button'],
    'Следующая категория'
  );
  result: BaseComponent;
  constructor() {
    super('div', ['popup']);
    this.result = new BaseComponent('h2', ['result-text']);
    const wrapper = new BaseComponent('div', [
      'popup-wrapper',
      'endround-wrapper',
    ]);
    const img = new BaseComponent('span', ['good-job']);
    wrapper.element.append(
      this.title.element,
      this.result.element,
      img.element,
      this.homeButton.element,
      this.categoriesButton.element
    );
    this.element.append(wrapper.element);
  }
}
