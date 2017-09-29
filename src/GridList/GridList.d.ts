import * as React from 'react';
import { StyledComponent } from '..';

export interface GridListProps {
  cellHeight?: number | 'auto';
  cols?: number;
  component?: React.ReactType;
  spacing?: number;
}

export type GridListClassKey =
  | 'root'
  ;

declare const GridList: StyledComponent<GridListProps, GridListClassKey>;

export default GridList;
