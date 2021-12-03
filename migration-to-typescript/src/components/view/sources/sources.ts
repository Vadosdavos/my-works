import { IDataSource } from '../../../types/news.types';
import './sources.css';

class Sources {
  draw(data: IDataSource[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

    data.forEach((item) => {
      const sourceClone = <HTMLElement>sourceItemTemp.content.cloneNode(true);

      (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
      sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources')?.append(fragment);
  }
}

export default Sources;
