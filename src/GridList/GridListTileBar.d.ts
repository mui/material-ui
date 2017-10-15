import * as React from 'react';
import { StyledComponent } from '..';

export interface GridListTileBarProps {
  actionIcon?: React.ReactNode;
  actionPosition?: 'left' | 'right';
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  titlePosition?: 'top' | 'bottom';
}

export type GridListTileBarClassKey =
  | 'root'
  | 'rootBottom'
  | 'rootTop'
  | 'rootWithSubtitle'
  | 'titleWrap'
  | 'titleWrapActionLeft'
  | 'titleWrapActionRight'
  | 'title'
  | 'subtitle'
  | 'actionIconPositionLeft'
  | 'childImg'
  ;

declare const GridListTileBar: StyledComponent<GridListTileBarProps, GridListTileBarClassKey>;

export default GridListTileBar;
