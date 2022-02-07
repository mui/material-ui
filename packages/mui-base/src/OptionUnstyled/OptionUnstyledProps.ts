import React from 'react';
import { OptionState } from '../ListboxUnstyled';

export interface OptionUnstyledComponentsPropsOverrides {}

export default interface OptionUnstyledProps<TValue> {
  /**
   * The value of the option.
   */
  value: TValue;
  children?: React.ReactNode;
  /**
   * If `true`, the option will be disabled.
   * @default false
   */
  disabled?: boolean;
  className?: string;
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to components.Root.
   * If both are provided, the component is used.
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the OptionUnstyled.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'li'> & OptionUnstyledComponentsPropsOverrides;
  };
}

export type OptionUnstyledOwnerState<TValue> = OptionUnstyledProps<TValue> & OptionState;
