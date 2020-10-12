import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface ImageListItemBarProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the item itself).
   */
  actionIcon?: React.ReactNode;
  /**
   * Position of secondary action IconButton.
   * @default 'right'
   */
  actionPosition?: 'left' | 'right';
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    positionBottom?: string;
    positionTop?: string;
    positionBelow?: string;
    titleWrap?: string;
    titleWrapBelow?: string;
    titleWrapActionPosLeft?: string;
    titleWrapActionPosRight?: string;
    title?: string;
    subtitle?: string;
    actionIcon?: string;
    actionIconActionPosLeft?: string;
  };
  /**
   * Position of the title bar.
   * @default 'bottom'
   */
  position?: 'below' | 'top' | 'bottom';
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle?: React.ReactNode;
  /**
   * Title to be displayed.
   */
  title?: React.ReactNode;
}

export type ImageListItemBarClassKey = keyof NonNullable<ImageListItemBarProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Image List](https://material-ui.com/components/image-list/)
 *
 * API:
 *
 * - [ImageListItemBar API](https://material-ui.com/api/image-list-item-bar/)
 */
export default function ImageListItemBar(props: ImageListItemBarProps): JSX.Element;
