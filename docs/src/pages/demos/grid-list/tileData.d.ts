export interface TileDataItem {
  img: string;
  title: string;
  author: string;
  cols: number;
  featured: boolean;
}

declare const tileData: TileDataItem[];

export default tileData;
