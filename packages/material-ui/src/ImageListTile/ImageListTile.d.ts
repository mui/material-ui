import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListTileTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * Theoretically you can pass any node as children, but the main use case is to pass an img,
     * in which case ImageListTile takes care of making the image "cover" available space
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
  classKey: ImageListTileClassKey;
}
/**
 *
 * Demos:
 *
 * - [Image List](https://material-ui.com/components/image-list/)
 *
 * API:
 *
 * - [ImageListTile API](https://material-ui.com/api/image-list-tile/)
 */
declare const ImageListTile: OverridableComponent<ImageListTileTypeMap>;

export type ImageListTileClassKey = 'root' | 'tile' | 'imgFullHeight' | 'imgFullWidth';

export type ImageListTileProps<
  D extends React.ElementType = ImageListTileTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ImageListTileTypeMap<P, D>, D>;

export default ImageListTile;
