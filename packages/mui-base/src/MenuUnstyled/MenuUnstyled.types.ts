import React from 'react';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';

export interface MenuUnstyledComponentsPropsOverrides {}

export interface MenuUnstyledProps {
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   */
  anchorEl?: PopperUnstyledProps['anchorEl'];
  children?: React.ReactNode;
  className?: string;
  component?: React.ElementType;
  components?: {
    Root?: React.ElementType;
    Popper?: React.ElementType;
  };
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'ul'> & MenuUnstyledComponentsPropsOverrides;
    popper?: Partial<React.ComponentPropsWithRef<typeof PopperUnstyled>> &
      MenuUnstyledComponentsPropsOverrides;
  };
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose?: () => void;
  /**
   * Controls whether the menu is displayed.
   * @default false
   */
  open?: boolean;
}

export interface MenuUnstyledOwnerState extends MenuUnstyledProps {
  open: boolean;
}
