import * as React from 'react';
import { SlotComponentProps } from '../utils';

export interface MenuItemUnstyledComponentsPropsOverrides {}

export interface MenuItemUnstyledOwnerState extends MenuItemUnstyledProps {
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
    root?: SlotComponentProps<
      'li',
      MenuItemUnstyledComponentsPropsOverrides,
      MenuItemUnstyledOwnerState
    >;
  };
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label?: string;
}
