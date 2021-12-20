import { BaseComponent } from '../base-componet';
import { InputComponent, InputTypes } from '../input-component';
import { ISettings } from '../toys-page/toy-card.type';
import './filters.scss';
import { IDataStructure, IFilterClassNamesTypes } from './filters.types';

const filterClassNames: IFilterClassNamesTypes = {
  шар: 'ball',
  колокольчик: 'bell',
  шишка: 'cone',
  снежинка: 'snowflake',
  фигурка: 'figure',
  белый: 'filter-color-white',
  жёлтый: 'filter-color-yellow',
  красный: 'filter-color-red',
  синий: 'filter-color-blue',
  зелёный: 'filter-color-green',
};

const dataStructure: IDataStructure = {
  shape: ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'],
  color: ['белый', 'жёлтый', 'красный', 'синий', 'зелёный'],
  size: ['большой', 'средний', 'малый'],
};
export class Filters extends BaseComponent {
  title = new BaseComponent('h3', ['filters-title'], 'Фильтры по назначению');
  shapeFilter = new BaseComponent('div', ['shape-filter'], 'Форма:');
  colorFilter = new BaseComponent('div', ['color-filter'], 'Цвет:');
  sizeFilter = new BaseComponent('div', ['size-filter'], 'Размер:');
  favoriteFilter = new InputComponent(InputTypes.checkbox, ['favorite-filter']);
  filtersSettings: ISettings;

  constructor(settings: ISettings) {
    super('div', ['filters']);
    this.filtersSettings = settings;
    this.render();
  }

  render() {
    this.makeFilters();
    const favoriteFilterContainer = new BaseComponent(
      'div',
      ['favorite-filter-container'],
      'Только любимые:'
    );
    const label = new BaseComponent('label', ['input-label']);
    label.element.setAttribute('for', 'fav-checkbox');
    this.favoriteFilter.element.setAttribute('id', 'fav-checkbox');
    favoriteFilterContainer.element.append(
      this.favoriteFilter.element,
      label.element
    );
    this.element.append(
      this.title.element,
      this.shapeFilter.element,
      this.colorFilter.element,
      this.sizeFilter.element,
      favoriteFilterContainer.element
    );
  }

  makeFilters() {
    for (const key in dataStructure) {
      const prop = <keyof IDataStructure>key;
      dataStructure[prop].forEach((el) => {
        const button = new BaseComponent('button', [`${filterClassNames[el]}`]);
        if (this.filtersSettings[prop].includes(el)) {
          button.element.classList.add('shape-size-active');
        }
        button.element.dataset.filter = el;
        this[`${prop}Filter`].element.append(button.element);
      });
    }
  }
}
