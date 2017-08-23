import * as React from 'react';
import { StyledComponent } from '..';

export interface ButtonBaseProps {
  centerRipple?: boolean;
  component?: React.ReactNode;
  disabled?: boolean;
  disableRipple?: boolean;
  focusRipple?: boolean;
  keyboardFocusedClassName?: string;
  onBlur?: React.FocusEventHandler<any>;
  onClick?: React.MouseEventHandler<any>;
  onFocus?: React.FocusEventHandler<any>;
  onKeyboardFocus?: React.FocusEventHandler<any>;
  onKeyDown?: React.KeyboardEventHandler<any>;
  onKeyUp?: React.KeyboardEventHandler<any>;
  onMouseDown?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onMouseUp?: React.MouseEventHandler<any>;
  onTouchEnd?: React.TouchEventHandler<any>;
  onTouchStart?: React.TouchEventHandler<any>;
  role?: string;
  tabIndex?: string;
  type?: string;
}

export default class ButtonBase extends StyledComponent<ButtonBaseProps> {}
