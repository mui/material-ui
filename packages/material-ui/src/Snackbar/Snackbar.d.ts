import * as React from 'react';
import { StandardProps } from '..';
import { SnackbarContentProps } from '../SnackbarContent';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';
import { ClickAwayListenerProps } from '../ClickAwayListener';

export interface SnackbarOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export type SnackbarCloseReason = 'timeout' | 'clickaway';

export interface SnackbarProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement> & Partial<TransitionHandlerProps>,
    SnackbarClassKey
  > {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: SnackbarContentProps['action'];
  /**
   * The anchor of the `Snackbar`.
   */
  anchorOrigin?: SnackbarOrigin;
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   */
  autoHideDuration?: number | null;
  /**
   * Replace the `SnackbarContent` component.
   */
  children?: React.ReactElement<any, any>;
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
  /**
   * Props applied to the [`SnackbarContent`](/api/snackbar-content/) element.
   */
  ContentProps?: Partial<SnackbarContentProps>;
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   */
  disableWindowBlurListener?: boolean;
  /**
   * When displaying multiple consecutive Snackbars from a parent rendering a single
   * <Snackbar/>, add the key prop to ensure independent treatment of each message.
   * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
   * features such as autoHideDuration may be canceled.
   * @document
   */
  key?: any;
  /**
   * The message to display.
   */
  message?: SnackbarContentProps['message'];
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`.
   */
  onClose?: (event: React.SyntheticEvent<any>, reason: SnackbarCloseReason) => void;
  /**
   * Callback fired before the transition is entering.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEnter?: TransitionHandlerProps['onEnter'];
  /**
   * Callback fired when the transition has entered.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEntered?: TransitionHandlerProps['onEntered'];
  /**
   * Callback fired when the transition is entering.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEntering?: TransitionHandlerProps['onEntering'];
  /**
   * Callback fired before the transition is exiting.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExit?: TransitionHandlerProps['onExit'];
  /**
   * Callback fired when the transition has exited.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExited?: TransitionHandlerProps['onExited'];
  /**
   * Callback fired when the transition is exiting.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExiting?: TransitionHandlerProps['onExiting'];
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  /**
   * If `true`, `Snackbar` is open.
   */
  open?: boolean;
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration?: number;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: React.ComponentType<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps;
}

export type SnackbarClassKey =
  | 'root'
  | 'anchorOriginTopCenter'
  | 'anchorOriginBottomCenter'
  | 'anchorOriginTopRight'
  | 'anchorOriginBottomRight'
  | 'anchorOriginTopLeft'
  | 'anchorOriginBottomLeft';

/**
 *
 * Demos:
 *
 * - [Snackbars](https://mui.com/components/snackbars/)
 *
 * API:
 *
 * - [Snackbar API](https://mui.com/api/snackbar/)
 */
export default function Snackbar(props: SnackbarProps): JSX.Element;
