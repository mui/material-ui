import { OverrideProps } from '@mui/types';
import * as React from 'react';
import { SlotComponentProps } from '../utils';

export interface OptionGroupUnstyledRootSlotPropsOverrides {}
export interface OptionGroupUnstyledLabelSlotPropsOverrides {}
export interface OptionGroupUnstyledListSlotPropsOverrides {}

export interface OptionGroupUnstyledOwnProps {
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
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'li',
      OptionGroupUnstyledRootSlotPropsOverrides,
      OptionGroupUnstyledOwnerState
    >;
    label?: SlotComponentProps<
      'span',
      OptionGroupUnstyledLabelSlotPropsOverrides,
      OptionGroupUnstyledOwnerState
    >;
    list?: SlotComponentProps<
      'ul',
      OptionGroupUnstyledListSlotPropsOverrides,
      OptionGroupUnstyledOwnerState
    >;
  };
  /**
   * The components used for each slot inside the OptionGroupUnstyled.
   * Either a string to use a HTML element or a component.
   * @default { root: 'li', label: 'span', list: 'ul' }
   */
  slots?: OptionGroupUnstyledSlots;
}

export interface OptionGroupUnstyledSlots {
  /**
   * The component used to render the root.
   * @default 'li'
   */
  root?: React.ElementType;
  /**
   * The component used to render the label.
   * @default 'span'
   */
  label?: React.ElementType;
  /**
   * The component used to render the list.
   * @default 'ul'
   */
  list?: React.ElementType;
}

export interface OptionGroupUnstyledTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & OptionGroupUnstyledOwnProps;
  defaultComponent: D;
}

export type OptionGroupUnstyledProps<
  D extends React.ElementType = OptionGroupUnstyledTypeMap['defaultComponent'],
> = OverrideProps<OptionGroupUnstyledTypeMap<{}, D>, D> & {
  component?: D;
};

export type OptionGroupUnstyledOwnerState = OptionGroupUnstyledOwnProps;

export type OptionGroupUnstyledRootSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: OptionGroupUnstyledOwnerState;
  ref: React.Ref<HTMLLIElement>;
};

export type OptionGroupUnstyledLabelSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: OptionGroupUnstyledOwnerState;
};

export type OptionGroupUnstyledListSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: OptionGroupUnstyledOwnerState;
};
