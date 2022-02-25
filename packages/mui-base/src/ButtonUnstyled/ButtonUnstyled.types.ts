import { OverrideProps } from '@mui/types';
import React from 'react';
import { UseButtonParameters, UseButtonRootSlotProps } from './useButton.types';

export interface ButtonUnstyledActions {
  focusVisible(): void;
}

export interface ButtonUnstyledComponentsPropsOverrides {}

export interface ButtonUnstyledOwnProps extends Omit<UseButtonParameters, 'ref'> {
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action?: React.Ref<ButtonUnstyledActions>;
  children?: React.ReactNode;
  className?: string;
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Button.
   * @default {}
   */
  componentsProps?: {
    root?: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonUnstyledComponentsPropsOverrides;
  };
}

export type ButtonUnstyledProps<
  D extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ButtonUnstyledTypeMap<P, D>, D> & {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: D;
};

export interface ButtonUnstyledTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonUnstyledOwnProps;
  defaultComponent: D;
}

export type ButtonUnstyledOwnerState = ButtonUnstyledOwnProps & {
  active: boolean;
  focusVisible: boolean;
};

export type ButtonUnstyledRootSlotProps = UseButtonRootSlotProps & {
  ownerState: ButtonUnstyledOwnerState;
  className: string;
  children?: React.ReactNode;
};
