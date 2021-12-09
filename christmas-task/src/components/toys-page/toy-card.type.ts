export interface ToyCardType {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface FavoritesTranscript {
  [key: string]: string;
}
