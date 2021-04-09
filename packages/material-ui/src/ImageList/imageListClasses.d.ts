import { ImageListClassKey } from './ImageList';

export type ImageListClasses = Record<ImageListClassKey, string>;

declare const imageListClasses: ImageListClasses;

export function getImageListUtilityClass(slot: string): string;

export default imageListClasses;
