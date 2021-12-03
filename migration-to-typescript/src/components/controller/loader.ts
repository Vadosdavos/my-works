import { INewsResponse } from '../../types/news.types';

interface IOptions {
  [apiKey: string]: string;
}

interface IRequest {
  endpoint: string;
  options?: RequestOption;
}

type RequestOption = {
  [sources: string]: string;
};

enum RequestMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

class Loader {
  private baseLink: string;

  private options: IOptions;

  constructor(baseLink: string, options: IOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: IRequest,
    callback = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load(RequestMethods.get, endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: RequestOption, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: RequestMethods, endpoint: string, callback: (data: INewsResponse) => void, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: INewsResponse) => callback(data))
      .catch((err: string) => console.error(err));
  }
}

export default Loader;
