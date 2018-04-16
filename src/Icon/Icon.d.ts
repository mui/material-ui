import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface IconProps
  extends StandardProps<React.HTMLAttributes<HTMLSpanElement>, IconClassKey> {
  color?: PropTypes.Color | 'action' | 'disabled' | 'error';
}

export type IconClassKey =
  | 'root'
  | 'colorSecondary'
  | 'colorAction'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary';

declare const Icon: React.ComponentType<IconProps>;

export default Icon;
