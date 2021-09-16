import * as React from 'react';
import { StandardProps } from '..';

export interface ImageListItemBarProps extends StandardProps<{}, ImageListItemBarClassKey> {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the item itself).
   */
  actionIcon?: React.ReactNode;
  /**
   * Position of secondary action IconButton.
   */
  actionPosition?: 'left' | 'right';
  /**
   * Position of the title bar.
   */
  position?: 'top' | 'bottom';
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle?: React.ReactNode;
  /**
   * Title to be displayed on item.
   */
  title?: React.ReactNode;
  /**
   * Position of the title bar.
   * @deprecated Use position instead.
   */
  titlePosition?: 'top' | 'bottom';
}

export type ImageListItemBarClassKey =
  | 'root'
  | 'positionBottom'
  | 'positionTop'
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
 * - [Image List](https://mui.com/components/image-list/)
 *
 * API:
 *
 * - [ImageListItemBar API](https://mui.com/api/image-list-item-bar/)
 */
export default function ImageListItemBar(props: ImageListItemBarProps): JSX.Element;
