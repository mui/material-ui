import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { ImageListItemBarClasses } from './imageListItemBarClasses';

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
  classes?: Partial<ImageListItemBarClasses>;
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Title to be displayed.
   */
  title?: React.ReactNode;
}

/**
 *
 * Demos:
 *
 * - [Image list](https://mui.com/material-ui/react-image-list/)
 *
 * API:
 *
 * - [ImageListItemBar API](https://mui.com/material-ui/api/image-list-item-bar/)
 */
export default function ImageListItemBar(props: ImageListItemBarProps): JSX.Element;
