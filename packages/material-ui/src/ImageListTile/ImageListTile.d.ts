import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ImageListTileTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    cols?: number;
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
