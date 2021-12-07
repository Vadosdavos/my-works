export class App {
  constructor(private readonly rootElement: HTMLElement) {
    this.rootElement.innerHTML = 'Hello!';
  }
}
