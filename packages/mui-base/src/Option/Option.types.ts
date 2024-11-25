import * as React from 'react';
import { Simplify } from '@mui/types';
import { UseOptionRootSlotProps } from '../useOption';
import { PolymorphicProps, SlotComponentProps } from '../utils';

export interface OptionRootSlotPropsOverrides {}

export interface OptionOwnProps<OptionValue> {
  /**
   * The value of the option.
   */
  value: OptionValue;
  children?: React.ReactNode;
  /**
   * If `true`, the option will be disabled.
   * @default false
   */
  disabled?: boolean;
  className?: string;
  /**
   * The props used for each slot inside the Option.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'li', OptionRootSlotPropsOverrides, OptionOwnerState<OptionValue>>;
  };
  /**
   * The components used for each slot inside the Option.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: OptionSlots;
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label?: string;
}

export interface OptionSlots {
  /**
   * The component that renders the root.
   * @default 'li'
   */
  root?: React.ElementType;
}

export interface OptionTypeMap<
  OptionValue,
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'li',
> {
  props: OptionOwnProps<OptionValue> & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type OptionProps<
  OptionValue,
  RootComponentType extends React.ElementType = OptionTypeMap<OptionValue>['defaultComponent'],
> = PolymorphicProps<OptionTypeMap<OptionValue, {}, RootComponentType>, RootComponentType>;

export interface OptionType {
  <
    OptionValue,
    RootComponentType extends React.ElementType = OptionTypeMap<OptionValue>['defaultComponent'],
  >(
    props: PolymorphicProps<OptionTypeMap<OptionValue>, RootComponentType>,
  ): React.JSX.Element | null;
  propTypes?: any;
  displayName?: string | undefined;
}

export type OptionOwnerState<OptionValue> = Simplify<
  OptionOwnProps<OptionValue> & {
    selected: boolean;
    highlighted: boolean;
    index: number;
  }
>;

export type OptionRootSlotProps<OptionValue> = Simplify<
  UseOptionRootSlotProps & {
    children?: React.ReactNode;
    className: string;
    ref: React.Ref<HTMLElement>;
    ownerState: OptionOwnerState<OptionValue>;
  }
>;
