import * as React from 'react';
import { StandardProps } from '..';

export interface ImageListTileBarProps extends StandardProps<{}, ImageListTileBarClassKey> {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon?: React.ReactNode;
  /**
   * Position of secondary action IconButton.
   */
  actionPosition?: 'left' | 'right';
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle?: React.ReactNode;
  /**
   * Title to be displayed on tile.
   */
  title?: React.ReactNode;
  /**
   * Position of the title bar.
   */
  titlePosition?: 'top' | 'bottom';
}

export type ImageListTileBarClassKey =
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
 * Demos:
 *
 * - [Image List](https://material-ui.com/components/image-list/)
 *
 * API:
 *
 * - [ImageListTileBar API](https://material-ui.com/api/image-list-tile-bar/)
 */
export default function ImageListTileBar(props: ImageListTileBarProps): JSX.Element;
