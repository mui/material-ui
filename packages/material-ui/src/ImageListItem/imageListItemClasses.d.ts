import { ImageListItemClassKey } from './ImageListItem';

export type ImageListItemClasses = Record<ImageListItemClassKey, string>;

declare const imageListItemClasses: ImageListItemClasses;

export function getImageListItemUtilityClass(slot: string): string;

export default imageListItemClasses;
