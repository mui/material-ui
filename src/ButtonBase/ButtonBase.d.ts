import * as React from 'react';
import { StyledComponent } from '..';

export type ButtonBaseProps = {
  centerRipple?: boolean;
  component?: React.ReactNode;
  disableRipple?: boolean;
  focusRipple?: boolean;
  keyboardFocusedClassName?: string;
  onKeyboardFocus?: React.FocusEventHandler<any>;
  rootRef?: React.Ref<any>;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default class ButtonBase extends StyledComponent<ButtonBaseProps> {}
