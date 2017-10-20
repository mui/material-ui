import * as React from 'react';
import { StandardProps, Replace } from '..';

export interface ButtonBaseProps extends StandardProps<
  Replace<React.AnchorHTMLAttributes<HTMLAnchorElement>, React.ButtonHTMLAttributes<HTMLButtonElement>>,
  ButtonBaseClassKey
> {
  centerRipple?: boolean;
  component?: React.ReactType;
  disableRipple?: boolean;
  focusRipple?: boolean;
  keyboardFocusedClassName?: string;
  onKeyboardFocus?: React.FocusEventHandler<any>;
  rootRef?: React.Ref<any>;
}

export type ButtonBaseClassKey =
  | 'root'
  | 'disabled'
  ;

declare const ButtonBase: React.ComponentType<ButtonBaseProps>;

export default ButtonBase;
