import { OverrideProps, Simplify } from '@mui/types';
import React from 'react';
import { ButtonUnstyledOwnProps } from '../ButtonUnstyled';
import { UseTabRootSlotProps } from './useTab.types';

interface TabUnstyledComponentsPropsOverrides {}

export interface TabUnstyledOwnProps
  extends Omit<ButtonUnstyledOwnProps, 'onChange' | 'components' | 'componentsProps'> {
  /**
   * You can provide your own value. Otherwise, we fall back to the child position index.
   */
  value?: number | string;
  /**
   * Callback invoked when new value is being set.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string) => void;
  /**
   * The components used for each slot inside the Tab.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Tab.
   * @default {}
   */
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'div'> & TabUnstyledComponentsPropsOverrides;
  };
}

export type TabUnstyledProps<
  D extends React.ElementType = TabUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabUnstyledTypeMap<P, D>, D> & {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: D;
};

export interface TabUnstyledTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & TabUnstyledOwnProps;
  defaultComponent: D;
}

export type TabUnstyledOwnerState = TabUnstyledProps & {
  active: boolean;
  focusVisible: boolean;
  disabled: boolean;
  selected: boolean;
};

export type TabUnstyledRootSlotProps = Simplify<
  UseTabRootSlotProps & {
    className?: string;
    ref: React.Ref<any>;
    ownerState: TabUnstyledOwnerState;
  }
>;
