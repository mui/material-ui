import * as React from 'react';
import { StyledComponent } from '..';

export interface GridListTileBarProps {
  actionIcon?: React.ReactElement<any>;
  actionPosition?: 'left' | 'right';
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  titlePosition?: 'top' | 'bottom';
}

declare const GridListTileBar: StyledComponent<GridListTileBarProps>;

export default GridListTileBar;
