export interface INews {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface INewsResponse {
  status: string;
  totalResults: number;
  articles: INews[];
}

export interface IDataSource {
  [key: string]: string;
}

export interface IData {
  status: string;
  sources: IDataSource[];
}
