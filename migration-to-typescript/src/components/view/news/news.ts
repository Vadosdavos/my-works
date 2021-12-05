import { INews } from '../../../types/news.types';
import './news.css';

class News {
  draw(data: INews[]) {
    if (data.length === 0) {
      this.addError();
    } else {
      const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

      const fragment = document.createDocumentFragment();
      const newsItemTemp = <HTMLTemplateElement>document.querySelector('#newsItemTemp');
      news.forEach((item, idx) => {
        const newsClone = <HTMLElement>newsItemTemp.content.cloneNode(true);

        if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

        (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
          item.urlToImage || 'img/news_placeholder.jpg'
        })`;

        (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;

        (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('-');

        (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
        (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
        (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
        newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

        fragment.append(newsClone);
      });

      (document.querySelector('.news') as HTMLElement).innerHTML = '';
      document.querySelector('.news')?.appendChild(fragment);
    }
  }

  addError() {
    const errorText = document.createElement('div');
    errorText.classList.add('error');
    errorText.textContent = 'News not found!';
    const news = document?.querySelector('.news');
    (news as HTMLElement).innerHTML = '';
    news?.append(errorText);
  }
}

export default News;
