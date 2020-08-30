export interface ItemDataItem {
  img: string;
  title: string;
  author: string;
  rows: number;
  cols: number;
  featured: boolean;
}

declare const itemData: ItemDataItem[];

export default itemData;
