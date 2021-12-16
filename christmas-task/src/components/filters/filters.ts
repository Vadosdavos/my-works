import { BaseComponent } from '../base-componet';
import { InputComponent, InputTypes } from '../input-component';
import './filters.scss';

export class Filters extends BaseComponent {
  title = new BaseComponent('h3', ['filters-title'], 'Фильтры по назначению');

  shapeFilter = new BaseComponent('div', ['shape-filter']);

  colorFilter = new BaseComponent('div', ['color-filter']);

  sizeFilter = new BaseComponent('div', ['size-filter'], 'Размер:');

  favoriteFilter = new InputComponent(
    InputTypes.checkbox,
    ['favorite-filter'],
    'Только любимые:',
  );

  constructor() {
    super('div', ['filters']);
    this.render();
  }

  render() {
    this.shapeFilter.element.innerHTML = `Форма:  
    <button class="ball" data-filter="шар"></button>
    <button class="bell" data-filter="колокольчик"></button>
    <button class="cone" data-filter="шишка"></button>
    <button class="snowflake" data-filter="снежинка"></button>
    <button class="figure" data-filter="фигурка"></button>`;
    this.colorFilter.element.innerHTML = `Цвет:   
    <button class="filter-color-white" data-filter="белый"></button>
    <button class="filter-color-yellow" data-filter="желтый"></button>
    <button class="filter-color-red" data-filter="красный"></button>
    <button class="filter-color-blue" data-filter="синий"></button>
    <button class="filter-color-green" data-filter="зелёный"></button>`;
    this.sizeFilter.element.innerHTML = `Размер: 
    <button data-filter="большой"></button>
    <button data-filter="средний"></button>
    <button data-filter="малый"></button>`;
    this.element.append(
      this.title.element,
      this.shapeFilter.element,
      this.colorFilter.element,
      this.sizeFilter.element,
      this.favoriteFilter.element,
    );
  }
}
