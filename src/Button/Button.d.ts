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

export type ButtonClassKey =
  | 'root'
  | 'dense'
  | 'label'
  | 'flatPrimary'
  | 'flatAccent'
  | 'flatContrast'
  | 'colorInherit'
  | 'raised'
  | 'keyboardFocused'
  | 'raisedPrimary'
  | 'raisedAccent'
  | 'raisedContrast'
  | 'disabled'
  | 'fab'
  ;

declare const Button: StyledComponent<ButtonProps, ButtonClassKey>;

export default Button
