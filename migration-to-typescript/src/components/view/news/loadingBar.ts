export class LoadingBar {
  element: HTMLElement;
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('loading');
    for (let i = 0; i < 3; i++) {
      const div = document.createElement('div');
      this.element.append(div);
    }
  }
}
