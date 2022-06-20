import * as React from 'react';
import { SxProps } from '@mui/system';
import { SnackbarUnstyledProps } from '@mui/base/SnackbarUnstyled';
import { Theme } from '../styles';
import { SnackbarContentProps } from '../SnackbarContent';
import { TransitionProps } from '../transitions/transition';
import { SnackbarClasses } from './snackbarClasses';

export interface SnackbarOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export { SnackbarCloseReason } from '@mui/base/SnackbarUnstyled';

export interface SnackbarProps
  extends Pick<
    SnackbarUnstyledProps,
    | 'autoHideDuration'
    | 'ClickAwayListenerProps'
    | 'disableWindowBlurListener'
    | 'onClose'
    | 'open'
    | 'resumeHideDuration'
  > {
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action?: SnackbarContentProps['action'];
  /**
   * The anchor of the `Snackbar`.
   * On smaller screens, the component grows to occupy all the available width,
   * the horizontal alignment is ignored.
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin?: SnackbarOrigin;
  /**
   * Replace the `SnackbarContent` component.
   */
  children?: React.ReactElement<any, any>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SnackbarClasses>;
  /**
   * Props applied to the [`SnackbarContent`](/material-ui/api/snackbar-content/) element.
   */
  ContentProps?: Partial<SnackbarContentProps>;
  /**
   * When displaying multiple consecutive Snackbars from a parent rendering a single
   * <Snackbar/>, add the key prop to ensure independent treatment of each message.
   * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
   * features such as autoHideDuration may be canceled.
   */
  key?: any;
  /**
   * The message to display.
   */
  message?: SnackbarContentProps['message'];
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<any, any> }
  >;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps?: TransitionProps;
}

/**
 *
 * Demos:
 *
 * - [Snackbars](https://mui.com/material-ui/react-snackbar/)
 *
 * API:
 *
 * - [Snackbar API](https://mui.com/material-ui/api/snackbar/)
 */
export default function Snackbar(props: SnackbarProps): JSX.Element;
