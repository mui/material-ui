import { ImageListItemBarClassKey } from './ImageListItemBar';

export type ImageListItemBarClasses = Record<ImageListItemBarClassKey, string>;

declare const imageListItemBarClasses: ImageListItemBarClasses;

export function getImageListItemBarUtilityClass(slot: string): string;

export default imageListItemBarClasses;
