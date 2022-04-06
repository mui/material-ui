import * as React from 'react';

export interface MenuItemUnstyledComponentsPropsOverrides {}

export interface MenuItemOwnerState extends MenuItemUnstyledProps {
  disabled: boolean;
  focusVisible: boolean;
}

export interface MenuItemUnstyledProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * If `true`, the menu item will be disabled.
   * @default false
   */
  disabled?: boolean;
  component?: React.ElementType;
  components?: {
    Root?: React.ElementType;
  };
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'li'> & MenuItemUnstyledComponentsPropsOverrides;
  };
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label?: string;
}
