import * as React from 'react';
import { OverrideProps, Simplify } from '@mui/types';
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

export interface TabsListTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: TabsListOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type TabsListProps<
  RootComponentType extends React.ElementType = TabsListTypeMap['defaultComponent'],
> = OverrideProps<TabsListTypeMap<{}, RootComponentType>, RootComponentType> & {
  component?: RootComponentType;
};

export type TabsListOwnerState = Simplify<
  TabsListOwnProps & {
    isRtl: boolean;
    orientation: 'horizontal' | 'vertical';
  }
>;

export type TabsListRootSlotProps = UseTabsListRootSlotProps & {
  className?: string;
  ownerState: TabsListOwnerState;
};
