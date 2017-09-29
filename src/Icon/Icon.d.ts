import * as React from 'react';
import { StyledComponent, PropTypes } from '..';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
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

declare const Icon: StyledComponent<IconProps, IconClassKey>;

export default Icon;
