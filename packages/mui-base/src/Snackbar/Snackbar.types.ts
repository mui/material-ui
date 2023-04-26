import * as React from 'react';
import { OverrideProps } from '@mui/types';
import ClickAwayListener, { ClickAwayListenerProps } from '../ClickAwayListener';
import { UseSnackbarParameters } from '../useSnackbar';
import { SlotComponentProps } from '../utils';

export interface SnackbarRootSlotPropsOverrides {}
export interface SnackbarClickAwayListenerSlotPropsOverrides {}

export interface SnackbarOwnProps extends Omit<UseSnackbarParameters, 'ref'> {
  children?: React.ReactNode;
  /**
   * The components used for each slot inside the Snackbar.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: SnackbarSlots;
  /**
   * The props used for each slot inside the Snackbar.
   * @default {}
   */
  slotProps?: {
    clickAwayListener?: SlotComponentProps<
      typeof ClickAwayListener,
      SnackbarClickAwayListenerSlotPropsOverrides,
      SnackbarOwnerState
    >;
    root?: SlotComponentProps<'div', SnackbarRootSlotPropsOverrides, SnackbarOwnerState>;
  };
  /**
   * The prop used to handle exited transition and unmount the component.
   * @default true
   */
  exited?: boolean;
}

export interface SnackbarSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export interface SnackbarTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & SnackbarOwnProps;
  defaultComponent: D;
}

export type SnackbarProps<
  D extends React.ElementType = SnackbarTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<SnackbarTypeMap<P, D>, D> & {
  component?: D;
};

export type SnackbarOwnerState = SnackbarProps;

export type SnackbarRootSlotProps = {
  ownerState: SnackbarOwnerState;
  className?: string;
  children?: React.ReactNode;
  ref: React.Ref<any>;
};

export interface SnackbarClickAwayListenerSlotProps extends ClickAwayListenerProps {
  ownerState: SnackbarOwnerState;
}
