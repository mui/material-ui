import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { UseTabPanelRootSlotProps } from '../useTabPanel';
import { SlotComponentProps } from '../utils';

export interface TabPanelUnstyledRootSlotPropsOverrides {}

export interface TabPanelUnstyledOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  className?: string;
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   * If not provided, it will fall back to the index of the panel.
   * It is recommended to explicitly provide it, as it's required for the tab panel to be rendered on the server.
   */
  value?: number | string;
  /**
   * The components used for each slot inside the TabPanel.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: TabPanelUnstyledSlots;
  /**
   * The props used for each slot inside the TabPanel.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'div',
      TabPanelUnstyledRootSlotPropsOverrides,
      TabPanelUnstyledOwnerState
    >;
  };
}

export interface TabPanelUnstyledSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export interface TabPanelUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & TabPanelUnstyledOwnProps;
  defaultComponent: D;
}

export type TabPanelUnstyledProps<
  D extends React.ElementType = TabPanelUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabPanelUnstyledTypeMap<P, D>, D> & {
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
