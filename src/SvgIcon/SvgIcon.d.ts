import * as React from 'react';
import { StandardProps } from '..';

export interface SvgIconProps extends StandardProps<
  React.SVGProps<SVGSVGElement>,
  SvgIconClassKey
> {
  titleAccess?: string;
  viewBox?: string;
}

export type SvgIconClassKey =
  | 'root'
  ;

declare const SvgIcon: React.ComponentType<SvgIconProps>;

export default SvgIcon;
