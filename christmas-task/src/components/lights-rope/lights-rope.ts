import { BaseComponent } from '../base-componet';
import './lights-rope.scss';

export class LightsRope extends BaseComponent {
  private renderConst = 29;

  private plusHeight = 40;

  constructor(private width: number, private color: string) {
    super('ul', ['lights-rope']);
    this.render();
  }

  private render(): void {
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.width + this.plusHeight + 'px';
    const lightsNum: number = Math.floor(this.width / this.renderConst);
    for (let i = -lightsNum / 2; i < lightsNum / 2; i++) {
      const light = new BaseComponent('li', [`${this.color}`]);
      light.element.style.transform = `translateY(${-(i ** 2)}px)`;
      this.element.append(light.element);
    }
  }
}
