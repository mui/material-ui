import React from 'react';

export interface OptionUnstyledComponentsPropsOverrides {}

export default interface OptionUnstyledProps<TValue> {
  /**
   * The value of the option.
   */
  value: TValue;
  children?: React.ReactNode;
  /**
   * If `true`, the option will be disabled.
   */
  disabled?: boolean;
  className?: string;
  component?: React.ElementType;
  components?: {
    Root?: React.ElementType;
  };
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'li'> & OptionUnstyledComponentsPropsOverrides;
  };
}
