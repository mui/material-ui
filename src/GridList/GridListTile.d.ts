import * as React from 'react';
import { StyledComponent } from '..';

export interface GridListTileProps {
  cols?: number;
  component?: React.ReactType;
  row?: number;
}

export type GridListTileClassKey =
  | 'root'
  | 'tile'
  | 'imgFullHeight'
  | 'imgFullWidth'
  ;

declare const GridListTile: StyledComponent<GridListTileProps, GridListTileClassKey>;

export default GridListTile;
