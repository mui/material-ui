import * as React from 'react';
import { EventHandlers } from '../utils/types';

export interface UseButtonRootSlotOwnProps {
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
  ref: React.Ref<any>;
}

export type UseButtonRootSlotProps<TOther = {}> = TOther & UseButtonRootSlotOwnProps;

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

export interface UseButtonReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param otherHandlers event handlers for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends EventHandlers = {}>(
    otherHandlers?: TOther,
  ) => UseButtonRootSlotProps<TOther>;
  /**
   * If `true`, the component is being focused using keyboard.
   * @default false
   */
  focusVisible: boolean;
  /**
   * Callback for setting the `focusVisible` param.
   */
  setFocusVisible: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: boolean;
  /**
   * If `true`, the component is active (pressed).
   * @default false
   */
  active: boolean;
  /**
   * A ref to the component's root DOM element.
   */
  ref: ((instance: unknown) => void) | null;
}
