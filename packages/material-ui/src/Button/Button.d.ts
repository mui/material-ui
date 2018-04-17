import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export interface ButtonProps extends StandardProps<ButtonBaseProps, ButtonClassKey, 'component'> {
  color?: PropTypes.Color;
  component?: React.ReactType<ButtonProps>;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
  href?: string;
  mini?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: string;
  variant?: 'flat' | 'raised' | 'fab';
}

export type ButtonClassKey =
  | ButtonBaseClassKey
  | 'label'
  | 'flatPrimary'
  | 'flatSecondary'
  | 'colorInherit'
  | 'raised'
  | 'keyboardFocused'
  | 'raisedPrimary'
  | 'raisedSecondary'
  | 'disabled'
  | 'fab'
  | 'mini'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'fullWidth';

declare const Button: React.ComponentType<ButtonProps>;

export default Button;
