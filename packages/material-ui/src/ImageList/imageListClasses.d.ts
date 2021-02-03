export interface ImageListClasses {
  root: string;
  masonry: string;
  quilted: string;
  standard: string;
  woven: string;
}

declare const imageListClasses: ImageListClasses;

export function getImageListUtilityClass(slot: string): string;

export default imageListClasses;
