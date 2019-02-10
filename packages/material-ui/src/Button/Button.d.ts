import * as React from 'react';
import { PropTypes } from '..';
import { ExtendButtonBase } from '../ButtonBase';
import { OverridableComponent, SimplifiedPropsOf, OverrideProps } from '../OverridableComponent';

declare const Button: ExtendButtonBase<{
  props: {
    color?: PropTypes.Color;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    type?: string;
    variant?: 'text' | 'outlined' | 'contained';
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
  | 'outlined'
  | 'outlinedPrimary'
  | 'outlinedSecondary'
  | 'contained'
  | 'containedPrimary'
  | 'containedSecondary'
  | 'focusVisible'
  | 'disabled'
  | 'colorInherit'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'fullWidth';

export default Button;
