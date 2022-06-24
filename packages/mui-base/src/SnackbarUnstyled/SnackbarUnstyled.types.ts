import React from 'react';
import { OverrideProps } from '@mui/types';
import { ClickAwayListenerProps } from '../ClickAwayListener';
import { UseSnackbarParameters } from './useSnackbar.types';

interface SnackbarUnstyledOwnProps extends Omit<UseSnackbarParameters, 'ref'> {
  children?: React.ReactNode;
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps?: Partial<ClickAwayListenerProps>;
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
    transition?: {
      [key: string]: any;
    };
  };
}

export interface SnackbarUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & SnackbarUnstyledOwnProps;
  defaultComponent: D;
}

export type SnackbarUnstyledProps<
  D extends React.ElementType = SnackbarUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<SnackbarUnstyledTypeMap<P, D>, D>;
