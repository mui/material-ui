import { Simplify } from '@mui/types';
import * as React from 'react';
import { ButtonOwnProps } from '../Button';
import { SlotComponentProps } from '../utils';
import { UseTabRootSlotProps } from '../useTab';
import { PolymorphicProps } from '../utils/PolymorphicComponent';

export interface TabRootSlotPropsOverrides {}

export interface TabOwnProps extends Omit<ButtonOwnProps, 'onChange' | 'slots' | 'slotProps'> {
  /**
   * You can provide your own value. Otherwise, it falls back to the child position index.
   */
  value?: number | string;
  /**
   * Callback invoked when new value is being set.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string) => void;
  /**
   * The props used for each slot inside the Tab.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'button', TabRootSlotPropsOverrides, TabOwnerState>;
  };
  /**
   * The components used for each slot inside the Tab.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: TabSlots;
}

export interface TabSlots {
  /**
   * The component that renders the root.
   * @default 'button'
   */
  root?: React.ElementType;
}

export type TabProps<RootComponentType extends React.ElementType = TabTypeMap['defaultComponent']> =
  PolymorphicProps<TabTypeMap<{}, RootComponentType>, RootComponentType>;

export interface TabTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'button',
> {
  props: TabOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type TabOwnerState = Simplify<
  TabOwnProps & {
    active: boolean;
    disabled: boolean;
    highlighted: boolean;
    selected: boolean;
  }
>;

export type TabRootSlotProps = Simplify<
  UseTabRootSlotProps & {
    className?: string;
    ref: React.Ref<any>;
    ownerState: TabOwnerState;
  }
>;
