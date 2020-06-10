import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface GridListTileTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    /**
     * Theoretically you can pass any node as children, but the main use case is to pass an img,
     * in which case GridListTile takes care of making the image "cover" available space
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
  classKey: GridListTileClassKey;
}
/**
 *
 * Demos:
 *
 * - [Grid List](https://material-ui.com/components/grid-list/)
 *
 * API:
 *
 * - [GridListTile API](https://material-ui.com/api/grid-list-tile/)
 */
declare const GridListTile: OverridableComponent<GridListTileTypeMap>;

export type GridListTileClassKey = 'root' | 'tile' | 'imgFullHeight' | 'imgFullWidth';

export type GridListTileProps<
  D extends React.ElementType = GridListTileTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<GridListTileTypeMap<P, D>, D>;

export default GridListTile;
