import * as React from 'react';
import { StandardProps } from '..';

export interface ButtonBaseProps
  extends StandardProps<
      React.AnchorHTMLAttributes<HTMLElement> & React.ButtonHTMLAttributes<HTMLElement>,
      ButtonBaseClassKey
    > {
  centerRipple?: boolean;
  component?: React.ReactType<ButtonBaseProps>;
  disableRipple?: boolean;
  focusRipple?: boolean;
  keyboardFocusedClassName?: string;
  onKeyboardFocus?: React.FocusEventHandler<any>;
  rootRef?: React.Ref<any>;
}

export type ButtonBaseClassKey = 'root' | 'disabled';

declare const ButtonBase: React.ComponentType<ButtonBaseProps>;

export default ButtonBase;
