import * as React from 'react';
import { StandardProps } from '..';

export interface GridListProps extends StandardProps<
  React.HTMLAttributes<HTMLUListElement>,
  GridListClassKey
> {
  cellHeight?: number | 'auto';
  cols?: number;
  component?: string | React.ComponentType<GridListProps>;
  spacing?: number;
}

export type GridListClassKey =
  | 'root'
  ;

declare const GridList: React.ComponentType<GridListProps>;

export default GridList;
