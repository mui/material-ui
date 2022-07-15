import React from 'react';
import { TransitionChildren } from 'react-transition-group/Transition';
import { OverrideProps } from '@mui/types';
import { ClickAwayListenerProps } from '../ClickAwayListener';
import { UseSnackbarParameters } from './useSnackbar.types';
import { SlotComponentProps } from '../utils';

export interface SnackbarUnstyledComponentsPropsOverrides {}

export interface SnackbarUnstyledOwnProps extends Omit<UseSnackbarParameters, 'ref'> {
  children?: React.ReactNode;
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
    clickAwayListener?: Partial<ClickAwayListenerProps>;
    root?: SlotComponentProps<
      'div',
      SnackbarUnstyledComponentsPropsOverrides,
      SnackbarUnstyledOwnerState
    >;
    transition?:
      | {
          [key: string]: any;
        }
      | ((ownerState: SnackbarUnstyledOwnerState) => {
          [key: string]: any;
        });
  };
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

export type SnackbarUnstyledOwnerState = SnackbarUnstyledProps & {
  exited: boolean;
};

export type SnackbarUnstyledRootSlotProps = {
  ownerState: SnackbarUnstyledOwnerState;
  className?: string;
  children?: React.ReactNode;
  ref: React.Ref<any>;
};

export type SnackbarUnstyledTransitionSlotProps = {
  ownerState: SnackbarUnstyledOwnerState;
  className?: string;
  children?: TransitionChildren;
};
