import { BaseComponent } from '../base-componet';
import { Filters } from '../filters/filters';
import { Ranges } from '../ranges/ranges';
import { Sort } from '../sort/sort';
import { ToyCard } from '../toy-card/toy-card';
import { ToyCardType } from './toy-card.type';
import data from '../../data';
import './toys-page.scss';

export let bookmarksToys: number[] = [];
export class ToysPage extends BaseComponent {
  toysContainer = new BaseComponent('div', ['toys-container']);

  controlsContainer = new BaseComponent('div', ['controls-container']);

  // toyCard: ToyCard;
  filters = new Filters();

  ranges = new Ranges();

  sort = new Sort();

  constructor() {
    super('section', ['toys-page']);
    this.render();
  }

  render() {
    this.controlsContainer.element.append(
      this.filters.element,
      this.ranges.element,
      this.sort.element
    );
    this.toysContainer.element.append(...this.renderCards(data));
    this.toysContainer.element.addEventListener('click', (event) => {
      this.setBookmarks(event);
    });
    this.element.append(
      this.controlsContainer.element,
      this.toysContainer.element
    );
  }

  renderCards(cards: ToyCardType[]) {
    return cards.map((el) => {
      const toyCard = new ToyCard(el);
      return toyCard.element;
    });
  }

  setBookmarks(event: Event) {
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
      console.log(bookmarksToys);
    }
  }

  showBooksmarksPopup(parent: HTMLDivElement) {
    const popup = new BaseComponent(
      'div',
      ['book-popup'],
      'Извините, все слоты в избранном заполнены!'
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
    }, 2000);
    setTimeout(() => {
      popup.element.remove();
    }, 2500);
  }
}
