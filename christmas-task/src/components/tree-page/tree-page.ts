import { BaseComponent } from '../base-componet';
import { Settings } from '../tree-settings/tree-settings';
import data from '../../data';
import './tree-page.scss';

const HOME_X = '11px';
const HOME_Y = '11px';

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

  constructor() {
    super('div', ['tree-page']);
    // this.render();
  }

  public render(): void {
    this.renderTree();
    this.element.append(
      this.treeSettings.element,
      this.treeContainer.element,
      this.bookmarksContainer.element,
    );
    this.choseBackground();
    this.renderBookedCards();
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

  private renderBookedCards(): void {
    this.bookmarksContainer.element.innerHTML = '';
    const bookedCards: number[] = JSON.parse(
      localStorage.getItem('bookmarks') as string,
    );
    bookedCards.forEach((el) => {
      const card = new BaseComponent('div', ['booked-toy-card']);
      const cardImg = new BaseComponent('img', ['toy-image']);
      const cardAmount = new BaseComponent('div', ['toy-amount']);
      cardImg.element.setAttribute('src', `${el}.png`);
      cardImg.element.id = el.toString();
      cardImg.element.draggable = true;
      if (this.toyData[el - 1]) {
        cardAmount.element.textContent = `${this.toyData[el - 1].count}`;
      }
      card.element.append(cardImg.element, cardAmount.element);
      this.bookmarksContainer.element.append(card.element);
      cardImg.element.addEventListener('dragstart', (event) => {
        this.dragDrop(event, this.treeMapArea.element, card.element);
      });
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

  // private dragDrop(event: MouseEvent): void {
  //   const target = <HTMLImageElement>event.target;
  //   const startX = target.getBoundingClientRect().left;
  //   const startY = target.getBoundingClientRect().top;
  //   let shiftX = event.clientX - target.getBoundingClientRect().left;
  //   let shiftY = event.clientY - target.getBoundingClientRect().top;
  //   target.style.position = 'absolute';
  //   target.style.zIndex = '1000';
  //   document.body.append(target);
  //   function moveAt(pageX: number, pageY: number): void {
  //     target.style.left = pageX - shiftX + 'px';
  //     target.style.top = pageY - shiftY + 'px';
  //   }
  //   moveAt(event.pageX, event.pageY);
  //   let currentDroppable: Element | null = null;
  //   function onMouseMove(event: MouseEvent): void {
  //     moveAt(event.pageX, event.pageY);
  //     target.style.visibility = 'hidden';
  //     let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  //     target.style.visibility = 'visible';

  //     if (!elemBelow) return;
  //     let droppableBelow = elemBelow.closest('.droppable');
  //     if (currentDroppable != droppableBelow) {
  //       if (currentDroppable) {
  //         console.log('out');
  //       }
  //       currentDroppable = droppableBelow as HTMLElement;
  //       if (currentDroppable) {
  //         console.log('drop');
  //       }
  //     }
  //   }
  //   document.addEventListener('mousemove', onMouseMove);
  //   target.onmouseup = function (): void {
  //     if (currentDroppable) {
  //       document.removeEventListener('mousemove', onMouseMove);
  //       target.onmouseup = null;
  //     } else {
  //       target.style.left = startX + 'px';
  //       target.style.top = startY + 'px';
  //       document.removeEventListener('mousemove', onMouseMove);
  //       target.onmouseup = null;
  //     }
  //   };
  //   target.ondragstart = function (): boolean {
  //     return false;
  //   };
  // }

  private dragDrop(
    event: DragEvent,
    dropZone: HTMLElement,
    homeElement: HTMLElement,
  ): void {
    const target = <HTMLImageElement>event.target;
    target.style.position = 'absolute';
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
        }
      }
      
      draggedEl.addEventListener('dragend', handleLeaveZone);
    }
    dropZone.addEventListener('dragover', handleOverDrop);
    dropZone.addEventListener('drop', handleOverDrop);
  }
}
