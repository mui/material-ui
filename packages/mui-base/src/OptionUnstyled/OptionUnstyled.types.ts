import React from 'react';
import { Simplify } from '@mui/types';
import { OptionState } from '../ListboxUnstyled';
import { UseSelectOptionSlotProps } from '../SelectUnstyled/useSelect.types';

export interface OptionUnstyledComponentsPropsOverrides {}

export interface OptionUnstyledProps<TValue> {
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
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label?: string;
}

export type OptionUnstyledOwnerState<TValue> = Simplify<OptionUnstyledProps<TValue> & OptionState>;

export type OptionUnstyledRootSlotProps<TValue> = Simplify<
  UseSelectOptionSlotProps & {
    children?: React.ReactNode;
    className: string;
    ref: React.Ref<HTMLLIElement>;
    ownerState: OptionUnstyledOwnerState<TValue>;
  }
>;
