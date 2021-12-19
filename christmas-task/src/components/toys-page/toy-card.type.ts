export interface FavoritesTranscript {
  [key: string]: string;
}
export interface IRangeFilter {
  left: number;
  right: number;
}

export interface ISettings {
  sortType: string;
  rangeAmount: IRangeFilter;
  rangeYear: IRangeFilter;
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
}
