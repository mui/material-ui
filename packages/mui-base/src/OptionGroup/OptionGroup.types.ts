import * as React from 'react';
import { PolymorphicProps, SlotComponentProps } from '../utils';

export interface OptionGroupRootSlotPropsOverrides {}
export interface OptionGroupLabelSlotPropsOverrides {}
export interface OptionGroupListSlotPropsOverrides {}

export interface OptionGroupOwnProps {
  /**
   * The human-readable description of the group.
   */
  label?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  /**
   * If `true` all the options in the group will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The components used for each slot inside the OptionGroup.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: OptionGroupSlots;
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'li', OptionGroupRootSlotPropsOverrides, OptionGroupOwnerState>;
    label?: SlotComponentProps<'span', OptionGroupLabelSlotPropsOverrides, OptionGroupOwnerState>;
    list?: SlotComponentProps<'ul', OptionGroupListSlotPropsOverrides, OptionGroupOwnerState>;
  };
}

export interface OptionGroupSlots {
  /**
   * The component that renders the root.
   * @default 'li'
   */
  root?: React.ElementType;
  /**
   * The component that renders the label.
   * @default 'span'
   */
  label?: React.ElementType;
  /**
   * The component that renders the list.
   * @default 'ul'
   */
  list?: React.ElementType;
}

export interface OptionGroupTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'li',
> {
  props: OptionGroupOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type OptionGroupProps<
  RootComponentType extends React.ElementType = OptionGroupTypeMap['defaultComponent'],
> = PolymorphicProps<OptionGroupTypeMap<{}, RootComponentType>, RootComponentType>;

export type OptionGroupOwnerState = OptionGroupOwnProps;

export type OptionGroupRootSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: OptionGroupOwnerState;
  ref: React.Ref<HTMLLIElement>;
};

export type OptionGroupLabelSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: OptionGroupOwnerState;
};

export type OptionGroupListSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: OptionGroupOwnerState;
};
