import { BaseComponent } from '../base-componet';
import { InputComponent, InputTypes } from '../input-component';
import './sort.scss';

export class Sort extends BaseComponent {
  title = new BaseComponent('h3', ['filters-title'], 'Сортировка и поиск');
  searchContainer = new BaseComponent('div', ['search-container']);
  searchInput = new InputComponent(InputTypes.search, ['search-field']);
  bookmarksIndicator = new BaseComponent('span', ['bookmarks-indicator'], '0');
  sortInput = new BaseComponent('select', ['select-filed']);
  resetButton = new BaseComponent('button', ['reset'], 'Сброс фильтров');

  constructor() {
    super('div', ['sort']);
    this.render();
  }
  render() {
    this.renderSearch();
    this.renderSort();
    this.element.append(
      this.title.element,
      this.searchContainer.element,
      this.sortInput.element,
      this.resetButton.element
    );
  }
  renderSearch() {
    this.searchInput.element.setAttribute(
      'placeholder',
      'Введите название игрушки'
    );
    this.searchInput.element.setAttribute('autocomplete', 'off');
    this.searchContainer.element.append(
      this.searchInput.element,
      this.bookmarksIndicator.element
    );
  }
  renderSort() {
    this.sortInput.element.innerHTML = `<option selected value="name-increase">По названию от «А» до «Я»</option>
    <option value="name-decrease">По названию от «Я» до «А»</option>
    <option value="amount-increase">По количеству по возрастанию</option>
    <option value="amount-decrease">По количеству по убыванию</option>`;
  }
}
