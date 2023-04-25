import * as React from 'react';
import { OverrideProps, Simplify } from '@mui/types';
import { UseButtonParameters, UseButtonRootSlotProps } from '../useButton';
import { SlotComponentProps } from '../utils';

export interface ButtonActions {
  focusVisible(): void;
}

export interface ButtonRootSlotPropsOverrides {}

export interface ButtonOwnProps extends Omit<UseButtonParameters, 'ref'> {
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action?: React.Ref<ButtonActions>;
  children?: React.ReactNode;
  className?: string;
  /**
   * The props used for each slot inside the Button.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'button', ButtonRootSlotPropsOverrides, ButtonOwnerState>;
  };
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: ButtonSlots;
}

export interface ButtonSlots {
  /**
   * The component that renders the root.
   * @default props.href || props.to ? 'a' : 'button'
   */
  root?: React.ElementType;
}

export type ButtonProps<D extends React.ElementType = ButtonTypeMap['defaultComponent']> =
  OverrideProps<ButtonTypeMap<{}, D>, D> & {
    component?: D;
  };

export interface ButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonOwnProps;
  defaultComponent: D;
}

export type ButtonOwnerState = ButtonOwnProps & {
  active: boolean;
  focusVisible: boolean;
};

export type ButtonRootSlotProps = Simplify<
  UseButtonRootSlotProps & {
    ownerState: ButtonOwnerState;
    className?: string;
    children?: React.ReactNode;
  }
>;
