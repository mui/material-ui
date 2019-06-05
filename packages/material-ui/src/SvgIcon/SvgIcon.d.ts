import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface SvgIconProps
  extends StandardProps<React.SVGProps<SVGSVGElement>, SvgIconClassKey> {
  color?: PropTypes.Color | 'action' | 'disabled' | 'error';
  component?: React.ElementType<React.SVGProps<SVGSVGElement>>;
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
  htmlColor?: string;
  shapeRendering?: string;
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
  | 'fontSizeInherit'
  | 'fontSizeSmall'
  | 'fontSizeLarge';

declare const SvgIcon: React.ComponentType<SvgIconProps>;

export default SvgIcon;
