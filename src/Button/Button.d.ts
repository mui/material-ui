import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export interface ButtonProps extends StandardProps<ButtonBaseProps, ButtonClassKey, 'component'> {
  color?: PropTypes.Color;
  component?: React.ReactType<ButtonProps>;
  dense?: boolean;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fab?: boolean;
  fullWidth?: boolean;
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
  | 'flatSecondary'
  | 'colorInherit'
  | 'raised'
  | 'keyboardFocused'
  | 'raisedPrimary'
  | 'raisedSecondary'
  | 'fab';

declare const Button: React.ComponentType<ButtonProps>;

export default Button;
