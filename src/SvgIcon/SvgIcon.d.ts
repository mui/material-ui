import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface SvgIconProps extends StandardProps<
  React.SVGProps<SVGSVGElement>,
  SvgIconClassKey
> {
  titleAccess?: string;
  viewBox?: string;
  color?: PropTypes.Color | 'action' | 'contrast' | 'disabled' | 'error';
}

export type SvgIconClassKey =
  | 'root'
  | 'colorAccent'
  | 'colorAction'
  | 'colorContrast'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary'
  ;

declare const SvgIcon: React.ComponentType<SvgIconProps>;

export default SvgIcon;
