import { BaseComponent } from '../base-componet';
import { FavoritesTranscript, ToyCardType } from '../toys-page/toy-card.type';
import './toy-card.scss';

export class ToyCard extends BaseComponent {
  data: ToyCardType;
  favoritesTranscript: FavoritesTranscript = {
    true: 'да',
    false: 'нет',
  };

  constructor(data: ToyCardType) {
    super('div', ['toy-card'], 'toy-card');
    this.data = data;
    this.element.innerHTML = `
      <h2 class="card-title">${data.name}</h2>
      <img class="card-img" src="assets/toys/${data.num}.png" alt="toy">
      <div class="card-description">      
        <p class="count">Количество:<span> ${data.count}</span></p>
        <p class="year">Год покупки:<span> ${data.year}</span></p>
        <p class="shape">Форма:<span> ${data.shape}</span></p>
        <p class="color">Цвет:<span> ${data.color}</span></p>
        <p class="size">Размер:<span> ${data.size}</span></p>
        <p class="favorite">Любимая:<span> ${
          this.favoritesTranscript[data.favorite.toString()]
        }</span></p>
      </div>
      <div class="ribbon"></div>`;
  }
}
