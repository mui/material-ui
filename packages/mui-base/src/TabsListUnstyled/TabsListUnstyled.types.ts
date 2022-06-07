import React from 'react';
import { OverrideProps } from '@mui/types';
import { UseTabsListRootSlotProps } from './useTabsList.types';

interface TabsListUnstyledComponentsPropsOverrides {}

export interface TabsListUnstyledOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  className?: string;
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'div'> & TabsListUnstyledComponentsPropsOverrides;
  };
}

export interface TabsListUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & TabsListUnstyledOwnProps;
  defaultComponent: D;
}

export type TabsListUnstyledProps<
  D extends React.ElementType = TabsListUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabsListUnstyledTypeMap<P, D>, D> & {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: D;
};

export type TabsListUnstyledOwnerState = TabsListUnstyledProps & {
  isRtl: boolean;
  orientation: 'horizontal' | 'vertical';
};

export type TabsListUnstyledRootSlotProps = UseTabsListRootSlotProps & {
  className?: string;
  ownerState: TabsListUnstyledOwnerState;
};
