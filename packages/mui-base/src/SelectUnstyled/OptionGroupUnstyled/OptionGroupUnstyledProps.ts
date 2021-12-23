import React from 'react';

export interface OptionGroupUnstyledComponentsPropsOverrides {}

export default interface OptionGroupUnstyledProps {
  /**
   * The human-readable description of the group.
   */
  label?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  /**
   * If `true` all the options in the group will be disabled.
   */
  disabled?: boolean;
  component?: React.ElementType;
  components?: {
    Root?: React.ElementType;
    Label?: React.ElementType;
    List?: React.ElementType;
  };
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'li'> & OptionGroupUnstyledComponentsPropsOverrides;
    label?: React.ComponentPropsWithRef<'span'> & OptionGroupUnstyledComponentsPropsOverrides;
    list?: React.ComponentPropsWithRef<'ul'> & OptionGroupUnstyledComponentsPropsOverrides;
  };
}
