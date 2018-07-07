import * as React from 'react';
import { StandardProps } from '..';

export interface GridListProps<C = {}>
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, GridListClassKey> {
  cellHeight?: number | 'auto';
  cols?: number;
  component?: React.ReactType<C>;
  spacing?: number;
}

export type GridListClassKey = 'root';

declare class GridList<C> extends React.Component<C & GridListProps<C>> {}

export default GridList;
