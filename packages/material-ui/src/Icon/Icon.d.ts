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
 *
 * Demos:
 * - {@link https://material-ui.com/components/icons/ Icons}
 * - {@link https://material-ui.com/components/material-icons/ Material Icons}
 *
 * API:
 * - {@link https://material-ui.com/api/Icon Icon API}
 *
 */
declare const Icon: React.ComponentType<IconProps>;

export default Icon;
