import { OverrideProps } from '@mui/types';
import React from 'react';
import { SlotComponentProps } from '../utils';

export interface OptionGroupUnstyledComponentsPropsOverrides {}

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
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to components.Root.
   * If both are provided, the component is used.
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the OptionGroupUnstyled.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Label?: React.ElementType;
    List?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<
      'li',
      OptionGroupUnstyledComponentsPropsOverrides,
      OptionGroupUnstyledOwnerState
    >;
    label?: SlotComponentProps<
      'span',
      OptionGroupUnstyledComponentsPropsOverrides,
      OptionGroupUnstyledOwnerState
    >;
    list?: SlotComponentProps<
      'ul',
      OptionGroupUnstyledComponentsPropsOverrides,
      OptionGroupUnstyledOwnerState
    >;
  };
}

export interface OptionGroupUnstyledTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & OptionGroupUnstyledOwnProps;
  defaultComponent: D;
}

export type OptionGroupUnstyledProps<
  D extends React.ElementType = OptionGroupUnstyledTypeMap['defaultComponent'],
> = OverrideProps<OptionGroupUnstyledTypeMap<{}, D>, D>;

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
