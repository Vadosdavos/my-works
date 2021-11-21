import { BaseComponent } from '../base-component';
import './categories-card.scss';

export class CategoriesCard extends BaseComponent {
  scoreButton: BaseComponent;
  titleBackground: BaseComponent;
  categoryResult: BaseComponent;
  constructor(title: string, categoryResNuber: number) {
    super('div', ['categories-card']);
    this.titleBackground = new BaseComponent('div', ['title-back'], title);
    this.categoryResult = new BaseComponent(
      'span',
      ['cat-result'],
      categoryResNuber > 0 ? categoryResNuber.toString() : ''
    );
    this.scoreButton = new BaseComponent('div', ['score-button']);
    this.titleBackground.element.append(this.categoryResult.element);
    this.element.append(this.scoreButton.element, this.titleBackground.element);
  }
}
