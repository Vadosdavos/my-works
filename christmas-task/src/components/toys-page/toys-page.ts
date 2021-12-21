import { BaseComponent } from '../base-componet';
import { Filters } from '../filters/filters';
import { Ranges } from '../ranges/ranges';
import { Sort } from '../sort/sort';
import { ToyCard } from '../toy-card/toy-card';
import data, { IDataType } from '../../data';
import * as noUiSlider from 'nouislider';
import './toys-page.scss';
import { ISettings } from './toy-card.type';

let bookmarksToys: number[] = [];
let bookmarksLength: number = bookmarksToys.length;
let filtersSettings: ISettings = {
  sortType: 'name-increase',
  rangeAmount: { left: 1, right: 12 },
  rangeYear: { left: 1940, right: 2020 },
  shape: [],
  color: [],
  size: [],
  favorite: false,
};
export class ToysPage extends BaseComponent {
  toysContainer = new BaseComponent('div', ['toys-container']);

  controlsContainer = new BaseComponent('div', ['controls-container']);

  toysData = data;

  curToysData = data;

  filters = new Filters(filtersSettings);

  ranges = new Ranges();

  sort = new Sort(bookmarksLength);

  noresultInfo = new BaseComponent(
    'div',
    ['noresult-info'],
    'Извините, совпадений не обнаружено!',
  );

  constructor() {
    super('section', ['toys-page']);
    this.render();
  }

  render(): void {
    this.controlsContainer.element.append(
      this.filters.element,
      this.ranges.element,
      this.sort.element,
    );
    this.toysContainer.element.append(...this.renderCards(this.toysData));
    this.toysContainer.element.addEventListener('click', (event) => {
      this.setBookmarks(event);
    });
    this.element.append(
      this.controlsContainer.element,
      this.toysContainer.element,
    );
    this.sort.sortInput.element.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement;
      filtersSettings.sortType = target.value;
      this.toysContainer.element.innerHTML = '';
      this.toysContainer.element.append(
        ...this.renderCards(this.sort.doSort(target.value, this.curToysData)),
      );
    });

    this.filters.shapeFilter.element.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      target.classList.toggle('shape-size-active');
      const shapeValue = target.dataset.filter;
      if (shapeValue) {
        if (filtersSettings.shape.includes(shapeValue)) {
          filtersSettings.shape = filtersSettings.shape.filter(
            (el) => el !== shapeValue,
          );
        } else {
          filtersSettings.shape.push(shapeValue);
        }
      }
      this.toysContainer.element.innerHTML = '';
      this.toysContainer.element.append(
        ...this.renderCards(this.resultFIlter(this.toysData, filtersSettings)),
      );
    });

    this.filters.colorFilter.element.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      target.classList.toggle('color-active');
      const colorValue = target.dataset.filter;
      if (colorValue) {
        if (filtersSettings.color.includes(colorValue)) {
          filtersSettings.color = filtersSettings.color.filter(
            (el) => el !== colorValue,
          );
        } else {
          filtersSettings.color.push(colorValue);
        }
      }
      this.toysContainer.element.innerHTML = '';
      this.toysContainer.element.append(
        ...this.renderCards(this.resultFIlter(this.toysData, filtersSettings)),
      );
    });

    this.filters.sizeFilter.element.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      target.classList.toggle('shape-size-active');
      const sizeValue = target.dataset.filter;
      if (sizeValue) {
        if (filtersSettings.size.includes(sizeValue)) {
          filtersSettings.size = filtersSettings.size.filter(
            (el) => el !== sizeValue,
          );
        } else {
          filtersSettings.size.push(sizeValue);
        }
      }
      this.toysContainer.element.innerHTML = '';
      this.toysContainer.element.append(
        ...this.renderCards(this.resultFIlter(this.toysData, filtersSettings)),
      );
    });

    this.filters.favoriteFilter.element.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      const favValue = target.checked;
      if (favValue) {
        filtersSettings.favorite = true;
      } else {
        filtersSettings.favorite = false;
      }
      this.toysContainer.element.innerHTML = '';
      this.toysContainer.element.append(
        ...this.renderCards(this.resultFIlter(this.toysData, filtersSettings)),
      );
    });

    const amountFilterTarget = this.ranges.setSlider(
      this.ranges.amount,
      'Количество экземпляров:',
      'count',
      filtersSettings.rangeAmount.left,
      filtersSettings.rangeAmount.right,
    );
    const yearFilterTarget = this.ranges.setSlider(
      this.ranges.year,
      'Год приобретения:',
      'year',
      filtersSettings.rangeYear.left,
      filtersSettings.rangeYear.right,
    );
    amountFilterTarget.noUiSlider?.on('update', (values) => {
      const leftBorder = parseInt('' + values[0]);
      const rightBorder = parseInt('' + values[1]);
      filtersSettings.rangeAmount.left = leftBorder;
      filtersSettings.rangeAmount.right = rightBorder;
      this.toysContainer.element.innerHTML = '';
      this.toysContainer.element.append(
        ...this.renderCards(this.resultFIlter(this.toysData, filtersSettings)),
      );
    });
    yearFilterTarget.noUiSlider?.on('update', (values) => {
      const leftBorder = parseInt('' + values[0]);
      const rightBorder = parseInt('' + values[1]);
      filtersSettings.rangeYear.left = leftBorder;
      filtersSettings.rangeYear.right = rightBorder;
      this.toysContainer.element.innerHTML = '';
      this.toysContainer.element.append(
        ...this.renderCards(this.resultFIlter(this.toysData, filtersSettings)),
      );
    });

    this.sort.resetButton.element.addEventListener('click', () => {
      this.resetFilters(amountFilterTarget, yearFilterTarget);
    });

    this.sort.searchInput.element.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      this.toysContainer.element.innerHTML = '';
      if (this.sort.doSearch(value, this.curToysData).length === 0) {
        this.toysContainer.element.append(...this.renderCards([]));
      } else {
        this.toysContainer.element.append(
          ...this.renderCards(this.sort.doSearch(value, this.curToysData)),
        );
      }
    });
  }

  renderCards(cards: IDataType[]): HTMLElement[] {
    this.setLocalStorage();
    if (cards.length === 0) return [this.noresultInfo.element];
    return cards.map((el) => {
      const toyCard = new ToyCard(el);
      if (bookmarksToys.includes(+el.num)) {
        toyCard.element.classList.add('marked');
      }
      return toyCard.element;
    });
  }

  setBookmarks(event: Event): void {
    const target = event.target as HTMLDivElement;
    if (target.className.includes('toy-card')) {
      if (target.dataset.num) {
        const toyNum = +target.dataset.num;
        if (bookmarksToys.length < 20) {
          target.classList.toggle('marked');
          if (!bookmarksToys.includes(toyNum)) {
            bookmarksToys.push(+target.dataset.num);
          } else {
            bookmarksToys = bookmarksToys.filter((el) => el !== toyNum);
          }
        } else {
          if (target.classList.contains('marked')) {
            bookmarksToys = bookmarksToys.filter((el) => el !== toyNum);
            target.classList.remove('marked');
          } else {
            this.showBooksmarksPopup(target);
          }
        }
      }
      this.sort.bookmarksIndicator.element.textContent =
        bookmarksToys.length.toString();
      bookmarksLength = bookmarksToys.length;
    }
    this.setLocalStorage();
  }

  showBooksmarksPopup(parent: HTMLDivElement): void {
    const showTime = 2000;
    const removeTime = 2500;
    const popup = new BaseComponent(
      'div',
      ['book-popup'],
      'Извините, все слоты в избранном заполнены!',
    );
    popup.element.style.display = 'block';
    setTimeout(() => {
      popup.element.style.opacity = '1';
    }, 0);
    popup.element.style.left =
      parent.clientLeft - popup.element.offsetWidth + 'px';
    popup.element.style.top = parent.clientTop + 'px';
    parent.style.pointerEvents = 'none';
    parent.append(popup.element);
    setTimeout(() => {
      popup.element.style.opacity = '0';
      parent.style.pointerEvents = 'auto';
    }, showTime);
    setTimeout(() => {
      popup.element.remove();
    }, removeTime);
  }

  resultFIlter(filteredData: IDataType[], settings: ISettings): IDataType[] {
    let resultArr: IDataType[] = [];

    resultArr = this.rangeFilter(
      filteredData,
      'count',
      settings.rangeAmount.left,
      settings.rangeAmount.right,
    );

    resultArr = this.rangeFilter(
      resultArr,
      'year',
      settings.rangeYear.left,
      settings.rangeYear.right,
    );

    resultArr = this.purposeFilter(resultArr, 'shape', settings.shape);

    resultArr = this.purposeFilter(resultArr, 'color', settings.color);

    resultArr = this.purposeFilter(resultArr, 'size', settings.size);

    resultArr = this.purposeFilter(resultArr, 'favorite', settings.favorite);

    this.curToysData = resultArr;
    return this.sort.doSort(filtersSettings.sortType, resultArr);
  }

  rangeFilter(
    filteredData: IDataType[],
    type: keyof IDataType,
    left: number,
    right: number,
  ): IDataType[] {
    return filteredData.filter((el) => +el[type] >= left && +el[type] <= right);
  }

  purposeFilter(
    filteredData: IDataType[],
    type: keyof IDataType,
    value: string[] | boolean,
  ): IDataType[] {
    if (typeof value === 'boolean') {
      return value ? filteredData.filter((el) => el[type]) : filteredData;
    } else {
      return value.length
        ? filteredData.filter((el) => value.includes(el[type] as string))
        : filteredData;
    }
  }

  resetFilters(
    amoutTarget: noUiSlider.target,
    yearTarget: noUiSlider.target,
  ): void {
    this.curToysData = this.toysData;
    const curSortType = filtersSettings.sortType;
    filtersSettings = {
      sortType: curSortType,
      rangeAmount: { left: 1, right: 12 },
      rangeYear: { left: 1940, right: 2020 },
      shape: [],
      color: [],
      size: [],
      favorite: false,
    };
    this.removeActive([
      this.filters.sizeFilter.element.children,
      this.filters.shapeFilter.element.children,
      this.filters.colorFilter.element.children,
    ]);
    (this.filters.favoriteFilter.element as HTMLInputElement).checked = false;
    amoutTarget.noUiSlider?.set([1, 12]);
    yearTarget.noUiSlider?.set([1940, 2020]);
    this.toysContainer.element.innerHTML = '';
    this.toysContainer.element.append(
      ...this.renderCards(
        this.sort.doSort(filtersSettings.sortType, this.curToysData),
      ),
    );
  }

  setLocalStorage(): void {
    localStorage.setItem('settings', JSON.stringify(filtersSettings));
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksToys));
    localStorage.setItem('bookmarksLength', JSON.stringify(bookmarksLength));
  }

  removeActive(target: HTMLCollection[]): void {
    target.forEach((el) => {
      Array.from(el).forEach((arrEl) =>
        arrEl.classList.remove('shape-size-active', 'color-active'),
      );
    });
  }
}

function getLocalStorage(): void {
  if (localStorage.getItem('settings')) {
    filtersSettings = JSON.parse(localStorage.getItem('settings') as string);
  }
  if (localStorage.getItem('bookmarks')) {
    bookmarksToys = JSON.parse(localStorage.getItem('bookmarks') as string);
  }
  if (localStorage.getItem('bookmarksLength')) {
    bookmarksLength = JSON.parse(
      localStorage.getItem('bookmarksLength') as string,
    );
  }
}

window.addEventListener('load', () => {
  getLocalStorage();
});

// renderCards(cards: IDataType[]) {
//   this.setLocalStorage();
//   if (cards.length === 0) return [this.noresultInfo.element];
//   return cards.map((el) => {
//     const toyCard = new ToyCard(el);
//     if (bookmarksToys.includes(+el.num)) {
//       toyCard.element.classList.add('marked');
//     }
//     toyCard.element.addEventListener(
//       'click',
//       this.setBookmarks.bind(toyCard)
//     );
//     return toyCard.element;
//   });
// }

// setBookmarks() {
//   const target = this.element;
//   const toyNum = +(target.dataset.num as string);
//   if (bookmarksToys.length < 20) {
//     target.classList.toggle('marked');
//     if (!bookmarksToys.includes(toyNum)) {
//       bookmarksToys.push(toyNum);
//     } else {
//       bookmarksToys = bookmarksToys.filter((el) => el !== toyNum);
//     }
//   } else {
//     if (target.classList.contains('marked')) {
//       bookmarksToys = bookmarksToys.filter((el) => el !== toyNum);
//       target.classList.remove('marked');
//     } else {
//       this.showBooksmarksPopup(target);
//     }
//   }
//   this.sort.bookmarksIndicator.element.textContent =
//     bookmarksToys.length.toString();
//   bookmarksLength = bookmarksToys.length;

//   this.setLocalStorage();
// }
