export class BaseComponent {
  readonly element: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    text?: string
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    if (text) this.element.textContent = text;
  }
}
