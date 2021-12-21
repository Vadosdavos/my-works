import { BaseComponent } from '../base-componet';
import './ranges.scss';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { IDataType } from '../../data';

const MIN_YEAR = 1940;
const MAX_YEAR = 2020;
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 12;

export class Ranges extends BaseComponent {
  title = new BaseComponent('h3', ['filters-title'], 'Фильтры по диапазону');

  amount = new BaseComponent('div', ['range-container']);

  year = new BaseComponent('div', ['range-container']);

  constructor() {
    super('div', ['ranges']);
    this.render();
  }

  render(): void {
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
  ): noUiSlider.target {
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
    const minValue = start < MIN_YEAR ? MIN_AMOUNT : MIN_YEAR;
    const maxValue = start < MIN_YEAR ? MAX_AMOUNT : MAX_YEAR;
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
