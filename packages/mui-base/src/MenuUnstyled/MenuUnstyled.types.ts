import React from 'react';

export interface MenuUnstyledComponentsPropsOverrides {}

export interface MenuUnstyledProps {
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
