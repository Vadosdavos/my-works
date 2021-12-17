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
    // this.setSlider(this.amount, 'Количество экземпляров:', 'amount', 1, 12);
    // this.setSlider(this.year, 'Год приобретения:', 'year', 1940, 2020);
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
    slider.classList.add(`${className}-slider`);
    noUiSlider.create(slider, {
      start: [start, end],
      connect: true,
      range: {
        min: start,
        max: end,
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

  // rangeFilter(
  //   filter: noUiSlider.target,
  //   curToysData: IDataType[],
  //   type: keyof IDataType
  // ) {
  //   let resultArr: IDataType[] = [];
  //   filter.noUiSlider?.on('update', (values) => {
  //     let leftBorder = parseInt('' + values[0]);
  //     let rightBorder = parseInt('' + values[1]);
  //     resultArr = curToysData.filter(
  //       (el) => +el[type] >= leftBorder && +el[type] <= rightBorder
  //     );
  //   });
  //   return resultArr;
  // }
}
