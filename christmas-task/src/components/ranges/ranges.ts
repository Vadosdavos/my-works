import { BaseComponent } from '../base-componet';
import './ranges.scss';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export class Ranges extends BaseComponent {
  title = new BaseComponent('h3', ['filters-title'], 'Фильтры по диапазону');
  amount = new BaseComponent('div', ['amount-container']);
  year = new BaseComponent('div', ['year-container'], 'year');

  constructor() {
    super('div', ['ranges']);
    this.setAmoutSlider();
    this.render();
  }
  render() {
    this.element.append(
      this.title.element,
      this.amount.element,
      this.year.element
    );
  }
  setAmoutSlider() {
    this.amount.element.append(
      new BaseComponent('h4', ['amount-title'], 'Количество экземпляров:')
        .element
    );
    const leftOutput = new BaseComponent(
      'output',
      ['slider-output', 'left-output'],
      '1'
    );
    const rigthOutput = new BaseComponent(
      'output',
      ['slider-output', 'rigth-ouput'],
      '12'
    );
    const slider: noUiSlider.target = document.createElement('div');
    slider.classList.add('main-slider');
    noUiSlider.create(slider, {
      start: [1, 12],
      connect: true,
      range: {
        min: 1,
        max: 12,
      },
      step: 1,
    });
    this.amount.element.append(leftOutput.element, slider, rigthOutput.element);
    slider.noUiSlider?.on('update', () => {
      let output = slider.noUiSlider?.get();
      if (output) {
        leftOutput.element.textContent = output.toString();
      }
    });
  }
}
