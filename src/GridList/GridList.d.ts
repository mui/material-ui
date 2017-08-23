import * as React from 'react';
import { StyledComponent } from '..';

export interface GridListProps {
  cellHeight?: number | 'auto';
  cols?: number;
  component?: React.ReactElement<any> | string;
  spacing?: number;
}

export default class GridList extends StyledComponent<GridListProps> {}
