import { BaseComponent } from '../base-componet';
import { InputComponent, InputTypes } from '../input-component';
import { ISettings } from '../toys-page/toy-card.type';
import './filters.scss';

export class Filters extends BaseComponent {
  title = new BaseComponent('h3', ['filters-title'], 'Фильтры по назначению');

  shapeFilter = new BaseComponent('div', ['shape-filter']);

  colorFilter = new BaseComponent('div', ['color-filter']);

  sizeFilter = new BaseComponent('div', ['size-filter'], 'Размер:');

  favoriteFilter = new InputComponent(InputTypes.checkbox, ['favorite-filter']);

  filtersSettings: ISettings;

  constructor(settings: ISettings) {
    super('div', ['filters']);
    this.filtersSettings = settings;
    this.render();
  }

  render() {
    this.shapeFilter.element.innerHTML = `Форма:  
    <button class="ball${
  this.filtersSettings.shape.includes('шар') ? ' shape-size-active' : ''
}" data-filter="шар"></button>
    <button class="bell${
  this.filtersSettings.shape.includes('колокольчик')
    ? ' shape-size-active'
    : ''
}" data-filter="колокольчик"></button>
    <button class="cone${
  this.filtersSettings.shape.includes('шишка') ? ' shape-size-active' : ''
}" data-filter="шишка"></button>
    <button class="snowflake${
  this.filtersSettings.shape.includes('снежинка')
    ? ' shape-size-active'
    : ''
}" data-filter="снежинка"></button>
    <button class="figure${
  this.filtersSettings.shape.includes('фигурка') ? ' shape-size-active' : ''
}" data-filter="фигурка"></button>`;
    this.colorFilter.element.innerHTML = `Цвет:   
    <button class="filter-color-white${
  this.filtersSettings.color.includes('белый') ? ' color-active' : ''
}" data-filter="белый"></button>
    <button class="filter-color-yellow${
  this.filtersSettings.color.includes('желтый') ? ' color-active' : ''
}" data-filter="желтый"></button>
    <button class="filter-color-red${
  this.filtersSettings.color.includes('красный') ? ' color-active' : ''
}" data-filter="красный"></button>
    <button class="filter-color-blue${
  this.filtersSettings.color.includes('синий') ? ' color-active' : ''
}" data-filter="синий"></button>
    <button class="filter-color-green${
  this.filtersSettings.color.includes('зелёный') ? ' color-active' : ''
}" data-filter="зелёный"></button>`;
    this.sizeFilter.element.innerHTML = `Размер: 
    <button class="${
  this.filtersSettings.size.includes('большой') ? ' shape-size-active' : ''
}" data-filter="большой"></button>
    <button class="${
  this.filtersSettings.size.includes('средний') ? ' shape-size-active' : ''
}" data-filter="средний"></button>
    <button class="${
  this.filtersSettings.size.includes('малый') ? ' shape-size-active' : ''
}" data-filter="малый"></button>`;
    const favoriteFilterContainer = new BaseComponent(
      'div',
      ['favorite-filter-container'],
      'Только любимые:',
    );
    const label = new BaseComponent('label', ['input-label']);
    label.element.setAttribute('for', 'fav-checkbox');
    this.favoriteFilter.element.setAttribute('id', 'fav-checkbox');
    favoriteFilterContainer.element.append(
      this.favoriteFilter.element,
      label.element,
    );
    this.element.append(
      this.title.element,
      this.shapeFilter.element,
      this.colorFilter.element,
      this.sizeFilter.element,
      favoriteFilterContainer.element,
    );
  }
}
