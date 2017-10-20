import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export interface ButtonProps extends StandardProps<
  ButtonBaseProps,
  ButtonClassKey
> {
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
  | ButtonBaseClassKey
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
  | 'fab'
  ;

declare const Button: React.ComponentType<ButtonProps>;

export default Button
