import React from 'react';
import { ClickAwayListenerProps } from '../ClickAwayListener';

export type SnackbarCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown';

export interface SnackbarUnstyledProps<TransitionType = {}> {
  /**
   * The Snackbar content if any.
   */
  children?: React.ReactElement<any, any>;
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the Snackbar.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Transition?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Snackbar.
   * @default {}
   */
  componentsProps?: {
    root?: React.HTMLAttributes<HTMLDivElement>;
    transition?: TransitionType;
  };
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose?: (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => void;
}
