import * as React from 'react';
import { StyledComponent } from '..';

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  titleAccess?: string;
  viewBox?: string;
}

export type SvgIconClassKey =
  | 'root'
  ;

declare const SvgIcon: StyledComponent<SvgIconProps, SvgIconClassKey>;

export default SvgIcon;
