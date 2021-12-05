import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { LoadingBar } from '../view/news/loadingBar';

class App {
  controller: AppController;

  view: AppView;

  loadingBar: LoadingBar;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.loadingBar = new LoadingBar();
  }

  start() {
    document?.querySelector('.sources')?.addEventListener('click', (e) => {
      this.addLoadingBar();
      this.controller.getNews(e, (data) => this.view.drawNews(data));
    });
    this.controller.getSources((data) => this.view.drawSources(data));
  }

  addLoadingBar() {
    const news = document?.querySelector('.news');
    (news as HTMLElement).innerHTML = '';
    news?.append(this.loadingBar.element);
  }
}

export default App;
