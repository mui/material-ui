import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface IconProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, IconClassKey> {
  color?: PropTypes.Color | 'action' | 'disabled' | 'error';
  component?: React.ReactType<IconProps>;
  fontSize?: 'inherit' | 'default';
  size?: 'small' | 'medium' | 'large';
}

export type IconClassKey =
  | 'root'
  | 'colorSecondary'
  | 'colorAction'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary'
  | 'fontSizeInherit';

declare const Icon: React.ComponentType<IconProps>;

export default Icon;
