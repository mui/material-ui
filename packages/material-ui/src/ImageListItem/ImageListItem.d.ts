import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * Theoretically you can pass any node as children, but the main use case is to pass an img,
     * in which case ImageListItem takes care of making the image "cover" available space
     * (similar to `background-size: cover` or to `object-fit: cover`).
     */
    children?: React.ReactNode;
    /**
     * Width of the tile in number of grid cells.
     */
    cols?: number;
    /**
     * Height of the tile in number of grid cells.
     */
    rows?: number;
  };
  defaultComponent: D;
  classKey: ImageListItemClassKey;
}
/**
 *
 * Demos:
 *
 * - [Image List](https://material-ui.com/components/image-list/)
 *
 * API:
 *
 * - [ImageListItem API](https://material-ui.com/api/image-list-item/)
 */
declare const ImageListItem: OverridableComponent<ImageListItemTypeMap>;

export type ImageListItemClassKey = 'root' | 'tile' | 'imgFullHeight' | 'imgFullWidth';

export type ImageListItemProps<
  D extends React.ElementType = ImageListItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ImageListItemTypeMap<P, D>, D>;

export default ImageListItem;
