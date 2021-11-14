export class BaseComponent<T extends HTMLElement = HTMLElement> {
  readonly element: T;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    text?: string
  ) {
    this.element = <T>document.createElement(tag);
    this.element.classList.add(...styles);
    if (text) this.element.textContent = text;
  }
}
