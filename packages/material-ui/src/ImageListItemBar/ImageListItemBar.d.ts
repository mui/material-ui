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
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `position="bottom"`. */
    positionBottom?: string;
    /** Styles applied to the root element if `position="top"`. */
    positionTop?: string;
    /** Styles applied to the root element if `position="below"`. */
    positionBelow?: string;
    /** Styles applied to the title and subtitle container element. */
    titleWrap?: string;
    /** Styles applied to the title and subtitle container element if `position="below"`. */
    titleWrapBelow?: string;
    /** Styles applied to the container element if `actionPosition="left"`. */
    titleWrapActionPosLeft?: string;
    /** Styles applied to the container element if `actionPosition="right"`. */
    titleWrapActionPosRight?: string;
    /** Styles applied to the title container element. */
    title?: string;
    /** Styles applied to the subtitle container element. */
    subtitle?: string;
    /** Styles applied to the actionIcon if supplied. */
    actionIcon?: string;
    /** Styles applied to the actionIcon if `actionPosition="left"`. */
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
