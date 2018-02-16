import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface SvgIconProps
  extends StandardProps<React.SVGProps<SVGSVGElement>, SvgIconClassKey, 'fontSize'> {
  color?: PropTypes.Color | 'action' | 'disabled' | 'error';
  fontSize?: boolean;
  nativeColor?: string;
  titleAccess?: string;
  viewBox?: string;
}

export type SvgIconClassKey =
  | 'root'
  | 'colorSecondary'
  | 'colorAction'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary'
  | 'fontSize';

declare const SvgIcon: React.ComponentType<SvgIconProps>;

export default SvgIcon;
