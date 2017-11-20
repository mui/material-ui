import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface IconProps extends StandardProps<
  React.HTMLAttributes<HTMLSpanElement>,
  IconClassKey
> {
  color?: PropTypes.Color | 'action' | 'contrast' | 'disabled' | 'error';
}

export type IconClassKey =
  | 'root'
  | 'colorAccent'
  | 'colorAction'
  | 'colorContrast'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary'
  ;

declare const Icon: React.ComponentType<IconProps>;

export default Icon;
