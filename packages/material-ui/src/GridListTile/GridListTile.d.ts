import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface GridListTileTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & {
    cols?: number;
    rows?: number;
  };
  defaultComponent: D;
  classKey: GridListTileClassKey;
}
/**
 * ⚠️ The GridList component was renamed to ImageList to align with the current Material Design naming.
 *
 * You should use `import { ImageListItem } from '@material-ui/core'`
 * or `import ImageListItem from '@material-ui/core/ImageListItem'`.
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
