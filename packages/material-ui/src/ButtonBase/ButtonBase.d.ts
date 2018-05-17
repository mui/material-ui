import * as React from 'react';
import { StandardProps } from '..';
import { TouchRippleProps } from './TouchRipple';

export interface ButtonBaseProps
  extends StandardProps<
      React.AnchorHTMLAttributes<HTMLElement> & React.ButtonHTMLAttributes<HTMLElement>,
      ButtonBaseClassKey
    > {
  action?: (actions: ButtonBaseActions) => void;
  buttonRef?: React.Ref<any>;
  centerRipple?: boolean;
  component?: React.ReactType<ButtonBaseProps>;
  disableRipple?: boolean;
  focusRipple?: boolean;
  focusVisibleClassName?: string;
  onFocusVisible?: React.FocusEventHandler<any>;
  TouchRippleProps?: Partial<TouchRippleProps>;
}

export type ButtonBaseClassKey = 'root' | 'disabled' | 'focusVisible';

export interface ButtonBaseActions {
  focusVisible(): void;
}

declare const ButtonBase: React.ComponentType<ButtonBaseProps>;

export default ButtonBase;
