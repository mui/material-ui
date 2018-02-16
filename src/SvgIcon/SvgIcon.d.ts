import * as React from 'react';
import { StandardProps, PropTypes } from '..';

interface SvgIconPropsInternal
  extends StandardProps<React.SVGProps<SVGSVGElement>, SvgIconClassKey> {
  color?: PropTypes.Color | 'action' | 'disabled' | 'error';
  fontSize?: any;
  nativeColor?: string;
  titleAccess?: string;
  viewBox?: string;
}

export interface SvgIconProps extends SvgIconPropsInternal {
  fontSize?: boolean;
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
