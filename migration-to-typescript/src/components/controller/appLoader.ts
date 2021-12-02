import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'b1834db308a74e118402bc0dffb3fd22', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
