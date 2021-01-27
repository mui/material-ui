export interface ImageListItemClasses {
  root: string;
  img: string;
  standard: string;
  woven: string;
  masonry: string;
  quilted: string;
}

declare const imageListItemClasses: ImageListItemClasses;

export function getImageListItemUtilityClass(slot: string): string;

export default imageListItemClasses;
