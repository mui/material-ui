import React from 'react';

export interface MenuUnstyledComponentsPropsOverrides {}

export default interface MenuUnstyledProps {
  children?: React.ReactNode;
  className?: string;
  component?: React.ElementType;
  components?: {
    Root?: React.ElementType;
  };
  componentsProps?: {
    root?: React.ComponentPropsWithRef<'ul'> & MenuUnstyledComponentsPropsOverrides;
  };
}

export interface MenuItemMetadata {
  id: string;
  disabled: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  ref: React.RefObject<HTMLElement>;
}
