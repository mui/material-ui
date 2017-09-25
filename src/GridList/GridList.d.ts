import * as React from 'react';
import { StyledComponent } from '..';

export interface GridListProps {
  cellHeight?: number | 'auto';
  cols?: number;
  component?: React.ReactType;
  spacing?: number;
}

declare const GridList: StyledComponent<GridListProps>;

export default GridList;
