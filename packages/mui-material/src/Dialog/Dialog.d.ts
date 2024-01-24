import * as React from 'react';
import { SxProps, Breakpoint } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { PaperProps } from '../Paper';
import { ModalProps } from '../Modal';
import { TransitionProps } from '../transitions/transition';
import { DialogClasses } from './dialogClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface DialogSlots {
  /**
   * The component that renders the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  transition?: React.JSXElementConstructor<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  paper?: React.JSXElementConstructor<PaperProps>;
}

export interface DialogTransitionSlotPropsOverrides {}
export interface DialogPaperSlotPropsOverrides {}

export type DialogSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DialogSlots,
  {
    transition: SlotProps<
      React.ElementType<TransitionProps>,
      DialogTransitionSlotPropsOverrides,
      DialogOwnerState
    >;
    paper: SlotProps<
      React.ElementType<PaperProps>,
      DialogPaperSlotPropsOverrides,
      DialogOwnerState
    >;
  }
>;

export interface DialogProps
  extends Omit<StandardProps<ModalProps, 'children'>, 'slots' | 'slotProps'>,
    DialogSlotsAndSlotProps {
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby'?: string;
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby'?: string;
  /**
   * Dialog children, usually the included sub-components.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogClasses>;
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown?: boolean;
  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen?: boolean;
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth?: Breakpoint | false;
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick?: ModalProps['onBackdropClick'];
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: ModalProps['onClose'];
  /**
   * If `true`, the component is shown.
   */
  open: ModalProps['open'];
  /**
   * The component used to render the body of the dialog.
   * @default Paper
   * @deprecated Use `slots.paper` instead. This prop will be removed in v7.
   */
  PaperComponent?: React.JSXElementConstructor<PaperProps>;
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   * @default {}
   * @deprecated Use `slotProps.paper` instead. This prop will be removed in v7.
   */
  PaperProps?: Partial<PaperProps<React.ElementType>>;
  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll?: 'body' | 'paper';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   * @deprecated Use `slots.transition` instead. This prop will be removed in v7.
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
   * @deprecated Use `slotProps.transition.timeout` instead. This prop will be removed in v7.
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated Use `slotProps.transition` instead. This prop will be removed in v7.
   */
  TransitionProps?: TransitionProps;
}

export interface DialogOwnerState extends DialogProps {}

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 *
 * Demos:
 *
 * - [Dialog](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [Dialog API](https://mui.com/material-ui/api/dialog/)
 * - inherits [Modal API](https://mui.com/material-ui/api/modal/)
 */
export default function Dialog(props: DialogProps): JSX.Element;
