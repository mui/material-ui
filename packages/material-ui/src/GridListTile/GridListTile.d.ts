import * as React from 'react';
import { StandardProps } from '..';

export interface GridListTileProps
  extends StandardProps<React.HTMLAttributes<HTMLLIElement>, GridListTileClassKey> {
  cols?: number;
  component?: React.ElementType<React.HTMLAttributes<HTMLLIElement>>;
  rows?: number;
}

export type GridListTileClassKey = 'root' | 'tile' | 'imgFullHeight' | 'imgFullWidth';

/**
 *
 *
 * Demos:
 *
 * - [Grid List](https://material-ui.com/components/grid-list/)
 *
 * API:
 *
 * - [GridListTile API](https://material-ui.com/api/grid-list-tile/)
 *
 */
declare const GridListTile: React.ComponentType<GridListTileProps>;

export default GridListTile;
