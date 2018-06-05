import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface ButtonProps<C> extends StandardProps<ButtonBaseProps<C>, ButtonClassKey, 'component'> {
  color?: PropTypes.Color;
  component?: React.ReactType<C>;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
  href?: string;
  mini?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: string;
  variant?: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab';
}

export type ButtonClassKey =
  | 'root'
  | 'label'
  | 'textPrimary'
  | 'textSecondary'
  | 'flat'
  | 'flatPrimary'
  | 'flatSecondary'
  | 'outlined'
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

declare class Button<C> extends React.Component<C & ButtonProps<C>> {}

export default Button;
