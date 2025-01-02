import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { ModalProps } from '../Modal';
import { BackdropProps } from '../Backdrop';
import { SlideProps } from '../Slide';
import { PaperProps } from '../Paper';
import { TransitionProps } from '../transitions/transition';
import { DrawerClasses } from './drawerClasses';

export interface DrawerRootSlotPropsOverrides {}

export interface DrawerDockedSlotPropsOverrides {}

export interface DrawerPaperSlotPropsOverrides {}

export interface DrawerTransitionSlotPropsOverrides {}

export interface DrawerBackdropSlotPropsOverrides {}

export interface DrawerSlots {
  /**
   * The component used for the popper.
   * @default Modal
   */
  root: React.ElementType;
  /**
   * The component used for the backdrop.
   * @default Backdrop
   */
  backdrop: React.ElementType;
  /**
   * The component used for the docked. It's also a root slot when variant is `permanent` or `persistent`.
   * @default div
   */
  docked: React.ElementType;
  /**
   * The component used for the paper.
   * @default Paper
   */
  paper: React.ElementType;
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Slide
   */
  transition: React.ElementType;
}

export type DrawerSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DrawerSlots,
  {
    root: SlotProps<React.ElementType<ModalProps>, DrawerRootSlotPropsOverrides, DrawerOwnerState>;
    backdrop: SlotProps<
      React.ElementType<BackdropProps>,
      DrawerBackdropSlotPropsOverrides,
      DrawerOwnerState
    >;
    docked: SlotProps<
      React.ElementType<React.HTMLProps<HTMLDivElement>>,
      DrawerDockedSlotPropsOverrides,
      DrawerOwnerState
    >;
    paper: SlotProps<
      React.ElementType<PaperProps>,
      DrawerPaperSlotPropsOverrides,
      DrawerOwnerState
    >;
    transition: SlotProps<
      React.ElementType<TransitionProps>,
      DrawerTransitionSlotPropsOverrides,
      DrawerOwnerState
    >;
  }
>;

export interface DrawerProps
  extends StandardProps<ModalProps, 'open' | 'children' | 'slots' | 'slotProps'>,
    DrawerSlotsAndSlotProps {
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DrawerClasses>;
  /**
   * The elevation of the drawer.
   * @default 16
   */
  elevation?: number;
  /**
   * Props applied to the [`Modal`](https://mui.com/material-ui/api/modal/) element.
   * @deprecated use the `slotProps.root` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  ModalProps?: Partial<ModalProps>;
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: ModalProps['onClose'];
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open?: boolean;
  /**
   * Props applied to the [`Paper`](https://mui.com/material-ui/api/paper/) element.
   * @deprecated use the `slotProps.paper` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  PaperProps?: Partial<PaperProps<React.ElementType>>;
  /**
   * Props applied to the [`Slide`](https://mui.com/material-ui/api/slide/) element.
   * @deprecated use the `slotProps.transition` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  SlideProps?: Partial<SlideProps>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @deprecated use the `slotProps.transition.transitionDuration` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant?: 'permanent' | 'persistent' | 'temporary';
}

// omit `slots` and `slotProps` to prevent recusion
export interface DrawerOwnerState extends Omit<DrawerProps, 'slots' | 'slotProps'> {}

/**
 * The props of the [Modal](https://mui.com/material-ui/api/modal/) component are available
 * when `variant="temporary"` is set.
 *
 * Demos:
 *
 * - [Drawer](https://mui.com/material-ui/react-drawer/)
 *
 * API:
 *
 * - [Drawer API](https://mui.com/material-ui/api/drawer/)
 */
export default function Drawer(props: DrawerProps): React.JSX.Element;
