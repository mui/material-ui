import * as React from 'react';
import { StandardProps } from '..';

export interface GridListTileProps<C = {}>
  extends StandardProps<React.HTMLAttributes<HTMLLIElement>, GridListTileClassKey> {
  cols?: number;
  component?: React.ReactType<C>;
  rows?: number;
}

export type GridListTileClassKey = 'root' | 'tile' | 'imgFullHeight' | 'imgFullWidth';

declare class GridListTile<C> extends React.Component<C & GridListTileProps<C>> {}

export default GridListTile;
