import * as React from 'react';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';
import { Color, StandardProps } from '../MuiProps';

export interface ButtonProps extends StandardProps<ButtonBaseProps, ButtonClassKey, 'component'> {
  color?: Color | 'contrast';
  component?: string | React.ComponentType<ButtonProps>;
  dense?: boolean;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fab?: boolean;
  href?: string;
  mini?: boolean;
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
  | 'fab';

declare const Button: React.ComponentType<ButtonProps>;

export default Button;
