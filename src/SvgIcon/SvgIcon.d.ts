import * as React from 'react';
import { StyledComponent } from '..';

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  titleAccess?: string;
  viewBox?: string;
}

declare const SvgIcon: StyledComponent<SvgIconProps>;

export default SvgIcon;
