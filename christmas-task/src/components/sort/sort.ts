import { IDataType } from '../../data';
import { BaseComponent } from '../base-componet';
import { InputComponent, InputTypes } from '../input-component';
import './sort.scss';

type SortCallback = (a: IDataType, b: IDataType) => number;
export class Sort extends BaseComponent {
  private title = new BaseComponent(
    'h3',
    ['filters-title'],
    'Сортировка и поиск',
  );

  private searchContainer = new BaseComponent('div', ['search-container']);

  public searchInput = new InputComponent(InputTypes.search, ['search-field']);

  public bookmarksIndicator: BaseComponent;

  public sortInput = new BaseComponent('select', ['select-filed']);

  public resetButton = new BaseComponent(
    'button',
    ['reset'],
    'Сброс фильтров',
  );

  private clearSettingsButton = new BaseComponent(
    'button',
    ['reset'],
    'Сброс настроек',
  );

  private booksNumber: number;

  constructor(bookmarksLength: number) {
    super('div', ['sort']);
    this.booksNumber = bookmarksLength;
    this.bookmarksIndicator = new BaseComponent(
      'span',
      ['bookmarks-indicator'],
      this.booksNumber.toString(),
    );
    this.render();
  }

  private render(): void {
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
      this.clearSettingsButton.element,
    );
  }

  private renderSearch(): void {
    this.searchInput.element.setAttribute(
      'placeholder',
      'Введите название игрушки',
    );
    this.searchInput.element.setAttribute('autocomplete', 'off');
    this.searchInput.element.autofocus = true;
    this.searchContainer.element.append(
      this.searchInput.element,
      this.bookmarksIndicator.element,
    );
  }

  private renderSort(): void {
    this.sortInput.element.innerHTML = `<option selected value="name-increase">По названию от «А» до «Я»</option>
    <option value="name-decrease">По названию от «Я» до «А»</option>
    <option value="year-increase">По году по возрастанию</option>
    <option value="year-decrease">По году по убыванию</option>`;
  }

  public doSort(value: string, curToysData: IDataType[]): IDataType[] {
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

  private increaseSort(field: keyof IDataType): SortCallback {
    return (a: IDataType, b: IDataType) => (a[field] > b[field] ? 1 : -1);
  }

  private decreaseSort(field: keyof IDataType): SortCallback {
    return (a: IDataType, b: IDataType) => (a[field] > b[field] ? -1 : 1);
  }

  private increaseNumSort(field: keyof IDataType): SortCallback {
    return (a: IDataType, b: IDataType) => +a[field] - +b[field];
  }

  private decreaseNumSort(field: keyof IDataType): SortCallback {
    return (a: IDataType, b: IDataType) => +b[field] - +a[field];
  }

  public doSearch(value: string, curToysData: IDataType[]): IDataType[] {
    const reg = new RegExp(value, 'i');
    return curToysData.filter((el) => reg.test(el.name));
  }
}
