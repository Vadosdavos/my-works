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

    // КАК ЛУЧШЕ ДОБАВИТЬ КАРТИКИ В КАРТОЧКИ ??

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
}
