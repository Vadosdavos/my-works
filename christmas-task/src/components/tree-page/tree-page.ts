import { BaseComponent } from '../base-componet';
import { Settings } from '../tree-settings/tree-settings';
import data from '../../data';
import './tree-page.scss';
import { LightsRope } from '../lights-rope/lights-rope';

const HOME_X = '11px';
const HOME_Y = '11px';
const DEFAULT_TOY_NUM = 20;
const COORDS = [
  '266,5,314,83,317,128,323,148,358,136,369,159,353,189,364,224,398,217,411,236,373,273,407,293,388,348,431,353,437,377,410,402,422,431,457,447,459,469,459,483,429,483,440,529,499,534,495,580,478,586,445,680,388,670,382,705,182,712,105,685,11,586,6,538,69,529,20,466,16,433,98,423,104,391,67,374,71,341,111,338,119,247,100,229,116,204,159,212,167,164,147,141,170,115,195,55,227,37,231,4',
  '250,2,373,244,423,404,457,509,482,523,468,569,496,578,483,652,430,679,385,669,392,698,321,704,242,682,208,681,147,711,103,694,103,662,57,642,2,646,5,619,14,553,44,473,82,423,74,381,99,299,176,118',
  '327,116,389,300,478,537,496,603,477,665,385,670,322,711,257,686,231,707,182,696,151,711,21,646,8,609,161,174,228,6,248,4,294,55',
  '241,0,321,145,342,204,366,233,365,294,396,312,406,350,394,388,420,411,421,445,446,460,417,490,450,522,421,542,495,614,461,646,423,648,443,703,365,687,270,711,141,677,82,711,77,677,50,660,9,667,3,601,40,549,68,492,34,494,63,442,94,413,62,410,80,312,139,252,146,216,119,211,153,188,165,161,148,156,174,138',
  '246,3,356,286,345,308,364,315,386,352,387,394,423,421,393,456,419,476,423,500,457,525,450,556,480,582,470,609,497,617,494,641,432,640,437,694,380,676,370,711,177,684,152,707,78,701,10,621',
  '267,53,287,29,299,79,365,192,355,231,384,237,423,365,447,379,425,435,453,453,474,561,497,577,459,591,459,607,481,612,483,649,438,649,300,709,227,694,168,699,154,682,106,686,0,619,36,593,21,568,19,513,48,481,46,441,76,413,54,371,79,349,91,322,110,321,93,287,108,254,145,238,124,207,134,188,156,205,147,148,159,142,173,151,181,115,198,73,206,65,225,79,220,49,228,38,242,55,245,3,263,3',
];

let CUR_COLOR = 'multi';
const SNOW_TIME = 50;
let IS_SNOW = false;
let VAD_BG = '0';
let VAD_TREE = '0';

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

  private snowContainer = new BaseComponent('div', ['snow-container']);

  private snowInterval = setInterval(() => {
    this.treeSettings.createSnowfall(this.snowContainer.element);
  }, SNOW_TIME);

  constructor() {
    super('div', ['tree-page']);
    clearInterval(this.snowInterval);
    this.setSnow();
  }

  public render(): void {
    this.preset();
    this.renderTree();
    this.element.append(
      this.treeSettings.element,
      this.treeContainer.element,
      this.bookmarksContainer.element,
    );
    this.chooseBackground();
    this.chooseTree();
    this.chooseLights();
    this.renderFavourites();
    this.setLightsoffListener();
  }

  private preset(): void {
    if (localStorage.getItem('vad-bg')) {
      VAD_BG = localStorage.getItem('vad-bg') as string;
    }
    if (localStorage.getItem('vad-tree')) {
      VAD_TREE = localStorage.getItem('vad-tree') as string;
    }
    this.treeContainer.element.style.backgroundImage = `url(../../assets/bg/${
      +VAD_BG + 1
    }.jpg`;
  }

  private setLightsoffListener(): void {
    this.treeSettings.lightsOffButton.element.addEventListener(
      'change',
      (event) => {
        const target: HTMLInputElement = <HTMLInputElement>event.target;
        if (target.checked) {
          this.setLightsOnTree(CUR_COLOR);
        } else {
          this.treeLightsContainer.element.innerHTML = '';
        }
      },
    );
  }

  private chooseBackground(): void {
    const bgsArray = Array.from(
      this.treeSettings.bgTypeContainer.element.children,
    );
    this.setActive(bgsArray, bgsArray[+VAD_BG]);
    bgsArray.forEach((el, i) => {
      el.addEventListener('click', () => {
        this.setActive(bgsArray, el);
        const bgStyle = <string>el.getAttribute('style');
        localStorage.setItem('vad-bg', i + '');
        this.treeContainer.element.setAttribute('style', bgStyle);
      });
    });
  }

  private renderFavourites(): void {
    const bookedCards: number[] = JSON.parse(
      localStorage.getItem('vad-bookmarks') as string,
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
    this.treeImg.element.setAttribute(
      'src',
      `url(../../assets/tree/${+VAD_TREE + 1}.png`,
    );
    this.treeImg.element.setAttribute('usemap', '#tree-map');
    this.treeImg.element.setAttribute('alt', 'Christmas tree');
    this.treeMap.element.setAttribute('name', 'tree-map');
    this.treeMapArea.element.setAttribute('shape', 'poly');
    this.treeMapArea.element.setAttribute('coords', COORDS[0]);
    this.treeMap.element.append(this.treeMapArea.element);
    this.treeContainer.element.append(
      this.snowContainer.element,
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

  private chooseTree(): void {
    const treesArray = Array.from(
      this.treeSettings.treeTypeContainer.element.children,
    );
    this.setActive(treesArray, treesArray[+VAD_TREE]);
    treesArray.forEach((el, i) => {
      el.addEventListener('click', () => {
        this.setActive(treesArray, el);
        this.treeImg.element.setAttribute(
          'src',
          `url(../../assets/tree/${i + 1}.png`,
        );
        localStorage.setItem('vad-tree', i + '');
        this.treeMapArea.element.setAttribute('coords', COORDS[i]);
      });
    });
  }

  private chooseLights(): void {
    const lighsArray = Array.from(
      this.treeSettings.lightsTypeContainer.element.children,
    );
    lighsArray.forEach((el) =>
      el.addEventListener('click', (event) => {
        const target = <HTMLButtonElement>event.target;
        this.setActive(lighsArray, target);
        this.treeLightsContainer.element.innerHTML = '';
        this.setLightsOnTree(`${target.dataset.color}`);
        CUR_COLOR = `${target.dataset.color}`;
        const onButton = this.treeSettings.lightsOffButton
          .element as HTMLInputElement;
        onButton.checked = true;
      }),
    );
  }

  private setActive(items: Element[], curItem: Element): void {
    items.forEach((item) => {
      item.classList.remove('type-active');
    });
    curItem.classList.add('type-active');
  }

  private setSnow(): void {
    if (localStorage.getItem('vad-snow')) {
      IS_SNOW = JSON.parse(localStorage.getItem('vad-snow') as string);
    }
    if (IS_SNOW) {
      this.setSnowInterval();
      this.treeSettings.snowButton.element.classList.add('snow-active');
    }
    this.setSnowListener();
  }

  private setSnowListener(): void {
    this.treeSettings.snowButton.element.addEventListener('click', () => {
      this.treeSettings.snowButton.element.classList.toggle('snow-active');
      IS_SNOW = !IS_SNOW;
      localStorage.setItem('vad-snow', IS_SNOW + '');
      if (IS_SNOW) {
        this.setSnowInterval();
      } else {
        clearInterval(this.snowInterval);
      }
    });
  }

  private setSnowInterval(): void {
    this.snowInterval = setInterval(() => {
      this.treeSettings.createSnowfall(this.snowContainer.element);
    }, SNOW_TIME);
  }
}
