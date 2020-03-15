import * as React from 'react';
import { StandardProps } from '..';

export interface GridListTileBarProps extends StandardProps<{}, GridListTileBarClassKey> {
  actionIcon?: React.ReactNode;
  actionPosition?: 'left' | 'right';
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  titlePosition?: 'top' | 'bottom';
}

export type GridListTileBarClassKey =
  | 'root'
  | 'titlePositionBottom'
  | 'titlePositionTop'
  | 'rootSubtitle'
  | 'titleWrap'
  | 'titleWrapActionPosLeft'
  | 'titleWrapActionPosRight'
  | 'title'
  | 'subtitle'
  | 'actionIcon'
  | 'actionIconActionPosLeft';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/grid-list/ Grid List}
 *
 * API:
 * - {@link https://material-ui.com/api/grid-list-tile-bar/ GridListTileBar API}
 *
 */
declare const GridListTileBar: React.ComponentType<GridListTileBarProps>;

export default GridListTileBar;
