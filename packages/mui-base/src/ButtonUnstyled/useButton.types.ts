import * as React from 'react';

interface UseButtonRootSlotOwnProps {
  'aria-disabled'?: React.AriaAttributes['aria-disabled'];
  disabled?: boolean;
  tabIndex?: number;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  role?: React.AriaRole;
  onBlur: React.FocusEventHandler;
  onFocus: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  onKeyUp: React.KeyboardEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  onMouseUp: React.MouseEventHandler;
  ref: React.Ref<any>;
}

export type UseButtonRootSlotProps<TOther = {}> = Omit<TOther, keyof UseButtonRootSlotOwnProps> &
  UseButtonRootSlotOwnProps;

export interface UseButtonParameters {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled?: boolean;
  href?: string;
  onFocusVisible?: React.FocusEventHandler;
  ref?: React.Ref<any>;
  tabIndex?: NonNullable<React.HTMLAttributes<any>['tabIndex']>;
  to?: string;
  /**
   * Type attribute applied when the `component` is `button`.
   * @default 'button'
   */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}
