import * as React from 'react';
import { MuiComponent, PropsOf, PropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';

declare const Button: MuiComponent<{
  outerProps: ButtonBaseProps & {
    color?: PropTypes.Color;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    href?: string;
    mini?: boolean;
    size?: 'small' | 'medium' | 'large';
    type?: string;
    variant?: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab';
  };
  defaultComponent: 'button' | 'a';
  classKey: ButtonClassKey;
}>;

export type ButtonProps = PropsOf<typeof Button>;

export type ButtonClassKey =
  | 'root'
  | 'label'
  | 'text'
  | 'textPrimary'
  | 'textSecondary'
  | 'flat'
  | 'flatPrimary'
  | 'flatSecondary'
  | 'outlined'
  | 'outlinedPrimary'
  | 'outlinedSecondary'
  | 'colorInherit'
  | 'contained'
  | 'containedPrimary'
  | 'containedSecondary'
  | 'raised'
  | 'raisedPrimary'
  | 'raisedSecondary'
  | 'focusVisible'
  | 'disabled'
  | 'fab'
  | 'mini'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'fullWidth';

export default Button;
