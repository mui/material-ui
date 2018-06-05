import * as React from 'react';
import { StandardProps } from '..';
import { TouchRippleProps } from './TouchRipple';

export interface ButtonBaseProps<C>
  extends StandardProps<
    React.AnchorHTMLAttributes<HTMLElement> & React.ButtonHTMLAttributes<HTMLElement>,
    ButtonBaseClassKey
  > {
  action?: (actions: ButtonBaseActions) => void;
  buttonRef?: React.Ref<any> | React.RefObject<any>;
  centerRipple?: boolean;
  component?: React.ReactType<C>;
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

declare class ButtonBase<C> extends React.Component<C & ButtonBaseProps<C>> {}

export default ButtonBase;
