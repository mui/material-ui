import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { UseTabsListRootSlotProps } from '../useTabsList';
import { SlotComponentProps } from '../utils';

export interface TabsListRootSlotPropsOverrides {}

export interface TabsListOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  className?: string;
  /**
   * The props used for each slot inside the TabsList.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', TabsListRootSlotPropsOverrides, TabsListOwnerState>;
  };
  /**
   * The components used for each slot inside the TabsList.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: TabsListSlots;
}

export interface TabsListSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export interface TabsListTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & TabsListOwnProps;
  defaultComponent: D;
}

export type TabsListProps<
  D extends React.ElementType = TabsListTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabsListTypeMap<P, D>, D> & {
  component?: D;
};

export type TabsListOwnerState = TabsListProps & {
  isRtl: boolean;
  orientation: 'horizontal' | 'vertical';
};

export type TabsListRootSlotProps = UseTabsListRootSlotProps & {
  className?: string;
  ownerState: TabsListOwnerState;
};
