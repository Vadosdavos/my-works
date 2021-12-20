import { IDataType } from '../../data';
import { BaseComponent } from '../base-componet';
import { InputComponent, InputTypes } from '../input-component';
import './sort.scss';

type sortCallback = (a: IDataType, b: IDataType) => number;
export class Sort extends BaseComponent {
  title = new BaseComponent('h3', ['filters-title'], 'Сортировка и поиск');
  searchContainer = new BaseComponent('div', ['search-container']);
  searchInput = new InputComponent(InputTypes.search, ['search-field']);
  bookmarksIndicator: BaseComponent;
  sortInput = new BaseComponent('select', ['select-filed']);
  resetButton = new BaseComponent('button', ['reset'], 'Сброс фильтров');
  clearSettingsButton = new BaseComponent(
    'button',
    ['reset'],
    'Сброс настроек'
  );
  booksNumber: number;

  constructor(bookmarksLength: number) {
    super('div', ['sort']);
    this.booksNumber = bookmarksLength;
    this.bookmarksIndicator = new BaseComponent(
      'span',
      ['bookmarks-indicator'],
      this.booksNumber.toString()
    );
    this.render();
  }

  render(): void {
    this.renderSearch();
    this.renderSort();
    this.clearSettingsButton.element.addEventListener('click', () => {
      console.log('LocalStorage has been cleared!');
      localStorage.clear();
    });
    this.element.append(
      this.title.element,
      this.searchContainer.element,
      this.sortInput.element,
      this.resetButton.element,
      this.clearSettingsButton.element
    );
  }

  renderSearch(): void {
    this.searchInput.element.setAttribute(
      'placeholder',
      'Введите название игрушки'
    );
    this.searchInput.element.setAttribute('autocomplete', 'off');
    this.searchInput.element.autofocus = true;
    this.searchContainer.element.append(
      this.searchInput.element,
      this.bookmarksIndicator.element
    );
  }

  renderSort(): void {
    this.sortInput.element.innerHTML = `<option selected value="name-increase">По названию от «А» до «Я»</option>
    <option value="name-decrease">По названию от «Я» до «А»</option>
    <option value="year-increase">По году по возрастанию</option>
    <option value="year-decrease">По году по убыванию</option>`;
  }

  doSort(value: string, curToysData: IDataType[]): IDataType[] {
    switch (value) {
      case 'name-increase':
        return curToysData.sort(this.increaseSort('name'));
      case 'name-decrease':
        return curToysData.sort(this.decreaseSort('name'));
      case 'year-increase':
        return curToysData.sort(this.increaseNumSort('year'));
      case 'year-decrease':
        return curToysData.sort(this.decreaseNumSort('year'));
    }
    return curToysData;
  }

  increaseSort(field: keyof IDataType): sortCallback {
    return (a: IDataType, b: IDataType) => (a[field] > b[field] ? 1 : -1);
  }

  decreaseSort(field: keyof IDataType): sortCallback {
    return (a: IDataType, b: IDataType) => (a[field] > b[field] ? -1 : 1);
  }

  increaseNumSort(field: keyof IDataType): sortCallback {
    return (a: IDataType, b: IDataType) => +a[field] - +b[field];
  }

  decreaseNumSort(field: keyof IDataType): sortCallback {
    return (a: IDataType, b: IDataType) => +b[field] - +a[field];
  }

  doSearch(value: string, curToysData: IDataType[]): IDataType[] {
    const reg = new RegExp(value, 'i');
    return curToysData.filter((el) => reg.test(el.name));
  }
}
