import { BaseComponent } from '../base-component';
import { ImagesData } from '../categories/categories.type';
import './popup.scss';

export class Popup extends BaseComponent {
  nextButton: BaseComponent;

  answerData: ImagesData;

  check: BaseComponent;

  constructor(answerData: ImagesData) {
    super('div', ['popup']);
    this.answerData = answerData;
    this.nextButton = new BaseComponent(
      'button',
      ['button', 'next-button'],
      'Далее',
    );
    this.check = new BaseComponent('span', ['correct-flag']);
    this.render(this.answerData);
  }

  render(data: ImagesData) {
    const wrapper = new BaseComponent('div', ['popup-wrapper']);
    const img = new BaseComponent('img', ['popup-image']);
    img.element.setAttribute(
      'src',
      `https://raw.githubusercontent.com/Vadosdavos/art-quiz-data/main/full/${data.imageNum}full.webp`,
    );
    const name = new BaseComponent('p', ['popup-text'], `${data.name}`);
    const author = new BaseComponent('p', ['popup-text'], `${data.author}`);
    const year = new BaseComponent('p', ['popup-text'], `${data.year}`);
    wrapper.element.append(
      this.check.element,
      img.element,
      name.element,
      author.element,
      year.element,
      this.nextButton.element,
    );
    this.element.append(wrapper.element);
  }
}
