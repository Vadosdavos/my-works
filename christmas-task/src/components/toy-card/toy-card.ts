import { IDataType } from '../../data';
import { BaseComponent } from '../base-componet';
import { FavoritesTranscript } from '../toys-page/toy-card.type';
import './toy-card.scss';

export class ToyCard extends BaseComponent {
  data: IDataType;

  favoritesTranscript: FavoritesTranscript = {
    true: 'да',
    false: 'нет',
  };

  constructor(data: IDataType) {
    super('div', ['toy-card'], 'toy-card');
    this.data = data;
    this.element.setAttribute('data-num', this.data.num);
    this.element.innerHTML = `
      <h2 class="card-title">${this.data.name}</h2>
      <img class="card-img" src="${this.data.num}.png" alt="toy">
      <div class="card-description">      
        <p class="count">Количество:<span> ${this.data.count}</span></p>
        <p class="year">Год покупки:<span> ${this.data.year}</span></p>
        <p class="shape">Форма:<span> ${this.data.shape}</span></p>
        <p class="color">Цвет:<span> ${this.data.color}</span></p>
        <p class="size">Размер:<span> ${this.data.size}</span></p>
        <p class="favorite">Любимая:<span> ${
  this.favoritesTranscript[this.data.favorite.toString()]
}</span></p>
      </div>
      <div class="ribbon"></div>`;
  }

  public showBooksmarksPopup(parent: HTMLElement): void {
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
}
