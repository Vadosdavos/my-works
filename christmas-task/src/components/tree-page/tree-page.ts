import { BaseComponent } from '../base-componet';
import { Settings } from '../tree-settings/tree-settings';
import data from '../../data';
import './tree-page.scss';
import { LightsRope } from '../lights-rope/lights-rope';

const HOME_X = '11px';
const HOME_Y = '11px';
const DEFAULT_TOY_NUM = 20;

export class TreePage extends BaseComponent {
  private toyData = data;

  private treeSettings = new Settings();

  private treeContainer = new BaseComponent('div', ['tree-container']);

  private bookmarksContainer = new BaseComponent('div', [
    'bookmarks-container',
  ]);

  private treeImg = new BaseComponent('img', ['main-tree']);

  private treeMap = new BaseComponent('map');

  private treeMapArea = new BaseComponent('area', ['droppable']);

  private treeLightsContainer = new BaseComponent('div', [
    'tree-lights-container',
  ]);

  constructor() {
    super('div', ['tree-page']);
    // this.render();
    this.treeSettings.lightsOffButton.element.addEventListener(
      'change',
      (event) => {
        const target: HTMLInputElement = <HTMLInputElement>event.target;
        if (target.checked) {
          this.setLightsOnTree('multi');
        } else {
          this.treeLightsContainer.element.innerHTML = '';
        }
      },
    );
    Array.from(this.treeSettings.lightsTypeContainer.element.children).forEach(
      (el) =>
        el.addEventListener('click', (event) => {
          const target = <HTMLButtonElement>event.target;
          this.treeLightsContainer.element.innerHTML = '';
          this.setLightsOnTree(`${target.dataset.color}`);
          (
            this.treeSettings.lightsOffButton.element as HTMLInputElement
          ).checked = true;
        }),
    );
  }

  public render(): void {
    this.renderTree();
    this.element.append(
      this.treeSettings.element,
      this.treeContainer.element,
      this.bookmarksContainer.element,
    );
    this.choseBackground();
    this.renderFavourites();
  }

  private choseBackground(): void {
    const bgsArray = Array.from(
      this.treeSettings.bgTypeContainer.element.children,
    );
    bgsArray.forEach((el) => {
      el.addEventListener('click', () => {
        const bgStyle = <string>el.getAttribute('style');
        this.treeContainer.element.setAttribute('style', bgStyle);
      });
    });
  }

  private renderFavourites(): void {
    const bookedCards: number[] = JSON.parse(
      localStorage.getItem('bookmarks') as string,
    );
    const dataFirstCards = this.toyData.slice(0, DEFAULT_TOY_NUM);
    const dataFirstCardsArr: number[] = [];
    dataFirstCards.forEach((el) => dataFirstCardsArr.push(+el.num));
    if (bookedCards.length > 0) {
      this.renderBookedCards(bookedCards);
    } else {
      this.renderBookedCards(dataFirstCardsArr);
    }
  }

  private renderBookedCards(bookedData: number[]): void {
    this.bookmarksContainer.element.innerHTML = '';
    bookedData.forEach((el) => {
      const card = new BaseComponent('div', ['booked-toy-card']);
      const cardAmount = new BaseComponent('div', ['toy-amount']);
      if (this.toyData[el - 1]) {
        cardAmount.element.textContent = `${this.toyData[el - 1].count}`;
      }
      card.element.append(cardAmount.element);
      for (let i = 0; i < +this.toyData[el - 1].count; i++) {
        this.renderToyImages(i, el, card.element);
      }
      this.bookmarksContainer.element.append(card.element);
    });
  }

  private renderToyImages(
    index: number,
    toyNum: number,
    parent: HTMLElement,
  ): void {
    const cardImg = new BaseComponent('img', ['toy-image']);
    cardImg.element.setAttribute('src', `${toyNum}.png`);
    cardImg.element.id = `${toyNum}-${index}`;
    cardImg.element.draggable = true;
    parent.append(cardImg.element);
    cardImg.element.addEventListener('dragstart', (event) => {
      this.dragDrop(event, this.treeMapArea.element, parent);
    });
  }

  private renderTree(): void {
    this.treeImg.element.setAttribute('src', 'url(../../assets/tree/1.png');
    this.treeImg.element.setAttribute('usemap', '#tree-map');
    this.treeImg.element.setAttribute('alt', 'Christmas tree');
    this.treeMap.element.setAttribute('name', 'tree-map');
    this.treeMapArea.element.setAttribute('shape', 'poly');
    this.treeMapArea.element.setAttribute(
      'coords',
      '264,3,400,221,499,529,441,709,110,711,0,562,17,422,100,218,234,0',
    );
    this.treeMap.element.append(this.treeMapArea.element);
    this.treeContainer.element.append(
      this.treeMap.element,
      this.treeImg.element,
    );
  }

  private dragDrop(
    event: DragEvent,
    dropZone: HTMLElement,
    homeElement: HTMLElement,
  ): void {
    const target = <HTMLImageElement>event.target;
    const toyAmountContainer = homeElement.children[0];
    event.dataTransfer?.setData('id', target.id);
    let shiftX = event.clientX - target.getBoundingClientRect().left;
    let shiftY = event.clientY - target.getBoundingClientRect().top;
    function handleOverDrop(event: DragEvent): void {
      event.preventDefault();
      if (event.type !== 'drop') {
        return;
      }
      let draggedId = <string>event.dataTransfer?.getData('id');
      let draggedEl = <HTMLImageElement>document.getElementById(draggedId);
      draggedEl?.parentNode?.removeChild(draggedEl);
      draggedEl.style.left = event.pageX - shiftX + 'px';
      draggedEl.style.top = event.pageY - shiftY + 'px';
      dropZone.appendChild(draggedEl);

      function handleLeaveZone(ev: DragEvent): void {
        draggedEl.style.visibility = 'hidden';
        const dropTarget = document.elementFromPoint(ev.clientX, ev.clientY);
        draggedEl.style.visibility = 'visible';
        if (dropTarget !== dropZone) {
          draggedEl?.parentNode?.removeChild(draggedEl);
          draggedEl.style.left = HOME_X;
          draggedEl.style.top = HOME_Y;
          homeElement.appendChild(draggedEl);
          let toysContainers = <HTMLCollection>(
            homeElement.parentElement?.children
          );
          for (let i = 0; i < toysContainers.length; i++) {
            let num = toysContainers[i].childElementCount - 1;
            toysContainers[i].children[0].textContent = num + '';
          }
        }
        toyAmountContainer.textContent = `${homeElement.children.length - 1}`;
      }
      draggedEl.addEventListener('dragend', handleLeaveZone);
    }
    dropZone.addEventListener('dragover', handleOverDrop);
    dropZone.addEventListener('drop', handleOverDrop);
  }

  public setLightsOnTree(color: string): void {
    const baseWidth = 120;
    const additionalWidth = 75;
    const ropesNumber = 8;
    for (let i = 0; i < ropesNumber; i++) {
      const rope = new LightsRope(baseWidth + additionalWidth * i, color);
      this.treeLightsContainer.element.append(rope.element);
    }
    this.treeContainer.element.prepend(this.treeLightsContainer.element);
  }
}
