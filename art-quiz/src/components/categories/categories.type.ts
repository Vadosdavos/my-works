export enum CategoriesTypes {
  artists = 'artists',
  pictures = 'pictures',
}
export interface ImagesData {
  author: string;
  name: string;
  year: string;
  imageNum: string;
  category: string;
}
