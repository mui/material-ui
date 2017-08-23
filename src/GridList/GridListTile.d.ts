import * as React from 'react';
import { StyledComponent } from '..';

export interface GridListTileProps {
  cols?: number;
  component?: React.ReactElement<any> | string;
  row?: number;
}

export default class GridListTile extends StyledComponent<GridListTileProps> {}
