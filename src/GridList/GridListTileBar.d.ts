import * as React from 'react';
import { StandardProps } from '..';

export interface GridListTileBarProps extends StandardProps<{}, GridListTileBarClassKey>
{
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

declare const GridListTileBar: React.ComponentType<GridListTileBarProps>;

export default GridListTileBar;
