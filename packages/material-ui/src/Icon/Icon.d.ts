import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface IconProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, IconClassKey> {
  color?: PropTypes.Color | 'action' | 'disabled' | 'error';
  component?: React.ElementType<React.HTMLAttributes<HTMLSpanElement>>;
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
}

export type IconClassKey =
  | 'root'
  | 'colorSecondary'
  | 'colorAction'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary'
  | 'fontSizeInherit'
  | 'fontSizeSmall'
  | 'fontSizeLarge';

/**
 *
 * Demos:
 *
 * - [Icons](https://material-ui.com/components/icons/)
 * - [Material Icons](https://material-ui.com/components/material-icons/)
 *
 * API:
 *
 * - [Icon API](https://material-ui.com/api/icon/)
 */
declare const Icon: React.ComponentType<IconProps>;

export default Icon;
