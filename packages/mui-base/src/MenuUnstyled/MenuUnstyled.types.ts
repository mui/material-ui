import React from 'react';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';

export interface MenuUnstyledComponentsPropsOverrides {}

export interface MenuUnstyledProps {
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
  onClose?: () => void;
  open?: boolean;
}

export interface MenuUnstyledOwnerState extends MenuUnstyledProps {
  open: boolean;
}
