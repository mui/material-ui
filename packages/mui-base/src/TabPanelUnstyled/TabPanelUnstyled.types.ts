import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { UseTabPanelRootSlotProps } from './useTabPanel.types';

interface TabPanelUnstyledComponentsPropsOverrides {}

export interface TabPanelUnstyledOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  className?: string;
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   */
  value: number | string;
  /**
   * The components used for each slot inside the TabPanel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };

  /**
   * The props used for each slot inside the TabPanel.
   * @default {}
   */
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'div'> & TabPanelUnstyledComponentsPropsOverrides;
  };
}

export interface TabPanelUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & TabPanelUnstyledOwnProps;
  defaultComponent: D;
}

export type TabPanelUnstyledProps<
  D extends React.ElementType = TabPanelUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabPanelUnstyledTypeMap<P, D>, D> & {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: D;
};

export type TabPanelUnstyledOwnerState = TabPanelUnstyledProps & {
  hidden: boolean;
};

export type TabPanelUnstyledRootSlotProps = UseTabPanelRootSlotProps & {
  children?: React.ReactNode;
  className?: string;
  ownerState: TabPanelUnstyledOwnerState;
  ref: React.Ref<any>;
  role: React.AriaRole;
};
