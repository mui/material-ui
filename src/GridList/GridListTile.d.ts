import * as React from 'react';
import { StyledComponent } from '..';

export interface GridListTileProps {
  cols?: number;
  component?: React.ReactType;
  row?: number;
}

declare const GridListTile: StyledComponent<GridListTileProps>;

export default GridListTile;
