import * as React from 'react';
import { StandardProps } from '..';

export interface GridListProps
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, GridListClassKey> {
  cellHeight?: number | 'auto';
  cols?: number;
  component?: React.ElementType<React.HTMLAttributes<HTMLUListElement>>;
  spacing?: number;
}

export type GridListClassKey = 'root';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/grid-list/ Grid List}
 *
 * API:
 * - {@link https://material-ui.com/api/grid-list/ GridList API}
 *
 */
declare const GridList: React.ComponentType<GridListProps>;

export default GridList;
