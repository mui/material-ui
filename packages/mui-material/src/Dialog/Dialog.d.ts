import * as React from 'react';
import { SxProps, Breakpoint } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { BackdropProps } from '../Backdrop';
import { PaperProps } from '../Paper';
import { ModalProps } from '../Modal';
import { TransitionProps } from '../transitions/transition';
import { DialogClasses } from './dialogClasses';
import { CreateSlotsAndSlotProps, SlotComponentProps, SlotProps } from '../utils/types';

export interface DialogSlots {
  /**
   * The component that renders the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  transition?: React.ElementType;
  /**
   * The component that renders the paper.
   * @default Paper
   */
  paper?: React.ElementType;
  /**
   * The component that renders the container.
   */
  container?: React.ElementType;
  /**
   * The component that renders the backdrop.
   */
  backdrop?: React.ElementType;
  /**
   * The component that renders the root.
   */
  root?: React.ElementType;
}

export interface DialogTransitionSlotPropsOverrides {}
export interface DialogPaperSlotPropsOverrides {}
export interface DialogContainerSlotPropsOverrides {}
export interface DialogBackdropSlotPropsOverrides {}
export interface DialogRootSlotPropsOverrides {}

export type DialogSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DialogSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the [Modal](https://mui.com/material-ui/api/modal/#props) component.
     */
    root: SlotProps<React.ElementType<ModalProps>, DialogRootSlotPropsOverrides, DialogOwnerState>;
    /**
     * Props forwarded to the backdrop slot.
     * By default, the avaible props are based on the [Backdrop](https://mui.com/material-ui/api/backdrop/#props) component.
     */
    backdrop: SlotProps<
      React.ElementType<BackdropProps>,
      DialogBackdropSlotPropsOverrides,
      DialogOwnerState
    >;
    /**
     * Props forwarded to the container slot.
     * By default, the avaible props are based on a div element.
     */
    container: SlotProps<'div', DialogContainerSlotPropsOverrides, DialogOwnerState>;
    /**
     * Props forwarded to the transition slot.
     * By default, the avaible props are based on the [Fade](https://mui.com/material-ui/api/fade/#props) component.
     */
    transition: SlotComponentProps<
      React.ElementType,
      TransitionProps & DialogTransitionSlotPropsOverrides,
      DialogOwnerState
    >;
    /**
     * Props forwarded to the paper slot.
     * By default, the avaible props are based on the [Paper](https://mui.com/material-ui/api/paper/#props) component.
     */
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
   * Informs assistive technologies that the element is modal.
   * It's added on the element with role="dialog".
   * @default true
   */
  'aria-modal'?: boolean | 'true' | 'false';
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
   */
  PaperComponent?: React.JSXElementConstructor<PaperProps>;
  /**
   * Props applied to the [`Paper`](https://mui.com/material-ui/api/paper/) element.
   * @default {}
   * @deprecated Use `slotProps.paper` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
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
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   * @deprecated Use `slots.transition` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
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
   */
  TransitionProps?: TransitionProps;
}

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
export default function Dialog(props: DialogProps): React.JSX.Element;

export interface DialogOwnerState extends Omit<DialogProps, 'slots' | 'slotProps'> {}
