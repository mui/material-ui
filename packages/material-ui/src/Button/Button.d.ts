import * as React from 'react';
import { PropTypes } from '..';
import { ButtonBaseTypeMap } from '../ButtonBase';
import { OverridableComponent, SimplifiedPropsOf } from '../OverridableComponent';

declare const Button: OverridableComponent<{
  outerProps: ButtonBaseTypeMap['outerProps'] & {
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
  defaultComponent: 'button';
  classKey: ButtonClassKey;
}>;

export type ButtonProps = SimplifiedPropsOf<typeof Button>;

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
  | 'extendedFab'
  | 'mini'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'fullWidth';

export default Button;
