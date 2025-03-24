import * as React from 'react';
import { SxProps } from '@mui/system';
import ClickAwayListener, { ClickAwayListenerProps } from '../ClickAwayListener';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '..';
import { SnackbarContentProps } from '../SnackbarContent';
import { TransitionProps } from '../transitions/transition';
import { SnackbarClasses } from './snackbarClasses';
import { CreateSlotsAndSlotProps, SlotComponentProps, SlotProps } from '../utils/types';

export interface SnackbarSlots {
  /**
   * The component that renders the root slot.
   * @default 'div'
   */
  root: React.ElementType;
  /**
   * The component that renders the content slot.
   * @default SnackbarContent
   */
  content: React.ElementType;
  /**
   * The component that renders the clickAwayListener slot.
   * @default ClickAwayListener
   */
  clickAwayListener: React.ElementType;
  /**
   * The component that renders the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  transition: React.ElementType;
}

export interface SnackbarRootSlotPropsOverrides {}
export interface SnackbarContentSlotPropsOverrides {}
export interface SnackbarClickAwayListenerSlotPropsOverrides {}

export interface SnackbarTransitionSlotPropsOverrides {}

export type SnackbarSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SnackbarSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the div element.
     */
    root: SlotProps<'div', SnackbarRootSlotPropsOverrides, SnackbarOwnerState>;
    /**
     * Props forwarded to the content slot.
     * By default, the avaible props are based on the [SnackbarContent](https://mui.com/material-ui/api/snackbar-content/#props) component.
     */
    content: SlotProps<
      React.ElementType<SnackbarContentProps>,
      SnackbarContentSlotPropsOverrides,
      SnackbarOwnerState
    >;
    /**
     * Props forwarded to the clickAwayListener slot.
     * By default, the avaible props are based on the [ClickAwayListener](https://mui.com/material-ui/api/click-away-listener/#props) component.
     */
    clickAwayListener: SlotComponentProps<
      typeof ClickAwayListener,
      SnackbarClickAwayListenerSlotPropsOverrides,
      SnackbarOwnerState
    >;
    /**
     * Props applied to the transition element.
     * By default, the element is based on the [Grow](https://mui.com/material-ui/api/grow/#props) component.
     */
    transition: SlotComponentProps<
      React.ElementType,
      TransitionProps & SnackbarTransitionSlotPropsOverrides,
      SnackbarOwnerState
    >;
  }
>;

export interface SnackbarOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export type SnackbarCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown';

export interface SnackbarProps
  extends Omit<StandardProps<React.HTMLAttributes<HTMLDivElement>>, 'slots' | 'slotProps'>,
    SnackbarSlotsAndSlotProps {
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
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration?: number | null;
  /**
   * Replace the `SnackbarContent` component.
   */
  children?: React.ReactElement<unknown, any>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SnackbarClasses>;
  /**
   * Props applied to the `ClickAwayListener` element.
   * @deprecated Use `slotProps.clickAwayListener` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
  /**
   * Props applied to the [`SnackbarContent`](https://mui.com/material-ui/api/snackbar-content/) element.
   * @deprecated Use `slotProps.content` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  ContentProps?: Partial<SnackbarContentProps>;
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener?: boolean;
  /**
   * When displaying multiple consecutive snackbars using a single parent-rendered
   * `<Snackbar/>`, add the `key` prop to ensure independent treatment of each message.
   * For instance, use `<Snackbar key={message} />`. Otherwise, messages might update
   * in place, and features like `autoHideDuration` could be affected.
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
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose?: (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => void;
  /**
   * If `true`, the component is shown.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @deprecated Use `slots.transition` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default Grow
   */
  TransitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<unknown, any> }
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated Use `slotProps.transition` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  TransitionProps?: TransitionProps;
}

/**
 *
 * Demos:
 *
 * - [Snackbar](https://v6.mui.com/material-ui/react-snackbar/)
 *
 * API:
 *
 * - [Snackbar API](https://v6.mui.com/material-ui/api/snackbar/)
 */
export default function Snackbar(props: SnackbarProps): React.JSX.Element;

export interface SnackbarOwnerState extends Omit<SnackbarProps, 'slots' | 'slotProps'> {}
