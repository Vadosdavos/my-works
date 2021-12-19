import { BaseComponent } from '../base-componet';
import './ranges.scss';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { IDataType } from '../../data';

export class Ranges extends BaseComponent {
  title = new BaseComponent('h3', ['filters-title'], 'Фильтры по диапазону');

  amount = new BaseComponent('div', ['range-container']);

  year = new BaseComponent('div', ['range-container']);

  constructor() {
    super('div', ['ranges']);
    this.render();
  }

  render() {
    this.element.append(
      this.title.element,
      this.amount.element,
      this.year.element,
    );
  }

  setSlider(
    parent: BaseComponent,
    title: string,
    className: keyof IDataType,
    start: number,
    end: number,
  ) {
    parent.element.append(
      new BaseComponent('h4', ['slider-title'], title).element,
    );
    const leftOutput = new BaseComponent(
      'output',
      ['slider-output'],
      `${start}`,
    );
    const rightOutput = new BaseComponent(
      'output',
      ['slider-output'],
      `${end}`,
    );
    const slider: noUiSlider.target = document.createElement('div');
    const minValue = start < 1940 ? 1 : 1940;
    const maxValue = start < 1940 ? 12 : 2020;
    slider.classList.add(`${className}-slider`);
    noUiSlider.create(slider, {
      start: [start, end],
      connect: true,
      range: {
        min: minValue,
        max: maxValue,
      },
      step: 1,
    });
    parent.element.append(leftOutput.element, slider, rightOutput.element);
    slider.noUiSlider?.on('update', () => {
      const outputValue = slider.noUiSlider?.get() as string[];
      if (outputValue) {
        leftOutput.element.textContent = parseInt(outputValue[0]).toString();
        rightOutput.element.textContent = parseInt(outputValue[1]).toString();
      }
    });
    return slider;
  }
}
