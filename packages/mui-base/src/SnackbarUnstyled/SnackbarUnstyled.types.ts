import * as React from 'react';
import { OverrideProps } from '@mui/types';
import ClickAwayListener, { ClickAwayListenerProps } from '../ClickAwayListener';
import { UseSnackbarParameters } from '../useSnackbar';
import { SlotComponentProps } from '../utils';

export interface SnackbarUnstyledRootSlotPropsOverrides {}
export interface SnackbarUnstyledClickAwayListenerSlotPropsOverrides {}

export interface SnackbarUnstyledOwnProps extends Omit<UseSnackbarParameters, 'ref'> {
  children?: React.ReactNode;
  /**
   * The props used for each slot inside the Snackbar.
   * @default {}
   */
  slotProps?: {
    clickAwayListener?: SlotComponentProps<
      typeof ClickAwayListener,
      SnackbarUnstyledClickAwayListenerSlotPropsOverrides,
      SnackbarUnstyledOwnerState
    >;
    root?: SlotComponentProps<
      'div',
      SnackbarUnstyledRootSlotPropsOverrides,
      SnackbarUnstyledOwnerState
    >;
  };
  /**
   * The components used for each slot inside the Snackbar.
   * Either a string to use a HTML element or a component.
   * @default { root: 'div' }
   */
  slots?: SnackbarUnstyledSlots;
  /**
   * The prop used to handle exited transition and unmount the component.
   * @default true
   */
  exited?: boolean;
}

export interface SnackbarUnstyledSlots {
  /**
   * The component used to render the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export interface SnackbarUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & SnackbarUnstyledOwnProps;
  defaultComponent: D;
}

export type SnackbarUnstyledProps<
  D extends React.ElementType = SnackbarUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<SnackbarUnstyledTypeMap<P, D>, D> & {
  component?: D;
};

export type SnackbarUnstyledOwnerState = SnackbarUnstyledProps;

export type SnackbarUnstyledRootSlotProps = {
  ownerState: SnackbarUnstyledOwnerState;
  className?: string;
  children?: React.ReactNode;
  ref: React.Ref<any>;
};

export interface SnackbarUnstyledClickAwayListenerSlotProps extends ClickAwayListenerProps {
  ownerState: SnackbarUnstyledOwnerState;
}
