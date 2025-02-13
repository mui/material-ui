import * as React from 'react';
import { Simplify } from '@mui/types';
import { SlotComponentProps } from '../utils';
import { PolymorphicProps } from '../utils/PolymorphicComponent';

export interface TabsRootSlotPropsOverrides {}

type TabsOrientation = 'horizontal' | 'vertical';

type TabsDirection = 'ltr' | 'rtl';

export interface TabsOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `null`.
   */
  value?: string | number | null;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string | number | null;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: TabsOrientation;
  /**
   * The direction of the text.
   * @default 'ltr'
   */
  direction?: TabsDirection;
  className?: string;
  /**
   * Callback invoked when new value is being set.
   */
  onChange?: (event: React.SyntheticEvent | null, value: number | string | null) => void;
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus?: boolean;
  /**
   * The props used for each slot inside the Tabs.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', TabsRootSlotPropsOverrides, TabsOwnerState>;
  };
  /**
   * The components used for each slot inside the Tabs.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: TabsSlots;
}

export interface TabsSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export interface TabsTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: TabsOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type TabsProps<
  RootComponentType extends React.ElementType = TabsTypeMap['defaultComponent'],
> = PolymorphicProps<TabsTypeMap<{}, RootComponentType>, RootComponentType>;

export type TabsOwnerState = Simplify<
  TabsOwnProps & {
    orientation: TabsOrientation;
    direction: TabsDirection;
  }
>;

export type TabsRootSlotProps = {
  ownerState: TabsOwnerState;
  ref: React.Ref<any>;
  className?: string;
};
