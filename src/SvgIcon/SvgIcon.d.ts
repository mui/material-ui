import * as React from 'react';
import { StyledComponent } from '..';

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  titleAccess?: string;
  viewBox?: string;
}

export default class SvgIcon extends StyledComponent<SvgIconProps> {}
