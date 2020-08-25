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
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the `div` element that wraps the children. */
      tile?: string;
      /** Styles applied to an `img` element child, if needed to ensure it covers the tile. */
      imgFullHeight?: string;
      /** Styles applied to an `img` element child, if needed to ensure it covers the tile. */
      imgFullWidth?: string;
    };
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

export type GridListTileClassKey = keyof NonNullable<GridListTileTypeMap['props']['classes']>;

export type GridListTileProps<
  D extends React.ElementType = GridListTileTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<GridListTileTypeMap<P, D>, D>;

export default GridListTile;
