import * as React from 'react';
import { StandardProps } from '..';

export interface GridListProps
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, GridListClassKey> {
  cellHeight?: number | 'auto';
  cols?: number;
  component?: React.ReactType<GridListProps>;
  spacing?: number;
}

export type GridListClassKey = 'root';

declare const GridList: React.ComponentType<GridListProps>;

export default GridList;
