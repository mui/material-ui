import * as React from 'react';
import { Color, StandardProps } from '../MuiProps';

export interface SvgIconProps
  extends StandardProps<React.SVGProps<SVGSVGElement>, SvgIconClassKey> {
  color?: Color | 'action' | 'contrast' | 'disabled' | 'error';
  titleAccess?: string;
  viewBox?: string;
}

export type SvgIconClassKey =
  | 'root'
  | 'colorAccent'
  | 'colorAction'
  | 'colorContrast'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary';

declare const SvgIcon: React.ComponentType<SvgIconProps>;

export default SvgIcon;
