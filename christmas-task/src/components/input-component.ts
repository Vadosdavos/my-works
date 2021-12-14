export enum InputTypes {
  text = 'text',
  checkbox = 'checkbox',
  range = 'range',
  radio = 'radio',
  search = 'search',
}

export class InputComponent {
  readonly element: HTMLInputElement | HTMLLabelElement;

  constructor(type: InputTypes, styles: string[] = [], label?: string) {
    if (label) {
      this.element = document.createElement('label');
      this.element.classList.add('input-label');
      this.element.textContent = label;
      const inputElement = document.createElement('input');
      inputElement.setAttribute('type', type);
      inputElement.classList.add(...styles);
      this.element.append(inputElement);
    } else {
      this.element = document.createElement('input');
      this.element.setAttribute('type', type);
      this.element.classList.add(...styles);
    }
  }
}
