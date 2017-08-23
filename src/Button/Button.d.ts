import * as React from 'react';
import { StyledComponent, PropTypes } from '..';
import { ButtonBaseProps } from '../ButtonBase';

export interface ButtonProps extends ButtonBaseProps {
  color?: PropTypes.Color | 'contrast';
  component?: React.ReactNode;
  dense?: boolean;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fab?: boolean;
  href?: string;
  raised?: boolean;
  type?: string;
}

export default class Button extends StyledComponent<ButtonProps> {}
