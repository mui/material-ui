import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface GridListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    cellHeight?: number | 'auto';
    cols?: number;
    spacing?: number;
  };
  defaultComponent: D;
  classKey: GridListClassKey;
}

declare const GridList: OverridableComponent<GridListTypeMap>;

export type GridListClassKey = 'root';

export type GridListProps<
  D extends React.ElementType = GridListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<GridListTypeMap<P, D>, D>;

export default GridList;
