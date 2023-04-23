import * as React from 'react';
import { DefaultComponentProps, OverrideProps, Simplify } from '@mui/types';
import { UseOptionRootSlotProps } from '../useOption';
import { SlotComponentProps } from '../utils';

export interface OptionUnstyledRootSlotPropsOverrides {}

export interface OptionUnstyledOwnProps<OptionValue> {
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
   * The props used for each slot inside the OptionUnstyled.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'li',
      OptionUnstyledRootSlotPropsOverrides,
      OptionUnstyledOwnerState<OptionValue>
    >;
  };
  /**
   * The components used for each slot inside the OptionUnstyled.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: OptionUnstyledSlots;
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label?: string;
}

export interface OptionUnstyledSlots {
  /**
   * The component that renders the root.
   * @default 'li'
   */
  root?: React.ElementType;
}

export interface OptionUnstyledTypeMap<OptionValue, P = {}, D extends React.ElementType = 'li'> {
  props: P & OptionUnstyledOwnProps<OptionValue>;
  defaultComponent: D;
}

export type OptionUnstyledProps<
  OptionValue,
  D extends React.ElementType = OptionUnstyledTypeMap<OptionValue>['defaultComponent'],
> = OverrideProps<OptionUnstyledTypeMap<OptionValue, {}, D>, D> & {
  component?: D;
};

export interface OptionUnstyledType {
  <OptionValue, C extends React.ElementType>(
    props: OverrideProps<OptionUnstyledTypeMap<OptionValue>, C>,
  ): JSX.Element | null;
  <OptionValue>(
    props: DefaultComponentProps<OptionUnstyledTypeMap<OptionValue>>,
  ): JSX.Element | null;
  propTypes?: any;
}

export type OptionUnstyledOwnerState<OptionValue> = Simplify<
  OptionUnstyledOwnProps<OptionValue> & {
    selected: boolean;
    highlighted: boolean;
    index: number;
  }
>;

export type OptionUnstyledRootSlotProps<OptionValue> = Simplify<
  UseOptionRootSlotProps & {
    children?: React.ReactNode;
    className: string;
    ref: React.Ref<HTMLLIElement>;
    ownerState: OptionUnstyledOwnerState<OptionValue>;
  }
>;
