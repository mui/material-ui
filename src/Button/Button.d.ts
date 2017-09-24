import * as React from 'react';
import { StyledComponent, PropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface ButtonProps extends ButtonBaseProps {
  color?: PropTypes.Color | 'contrast';
  component?: React.ReactType;
  dense?: boolean;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fab?: boolean;
  href?: string;
  raised?: boolean;
  type?: string;
}

declare const Button: StyledComponent<ButtonProps>;

export default Button
