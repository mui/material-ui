import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import { SxProps } from '../styles/defaultTheme';

export type MenuListSlot = 'root';

export interface MenuListPropsSizeOverrides {}

export interface MenuActions extends MenuUnstyledActions {}

export interface MenuListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * A ref with imperative actions.
     * It allows to select the first or last menu item.
     */
    actions?: React.Ref<MenuUnstyledActions>;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The size of the component (affect other nested list* components).
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', MenuListPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type MenuListProps<
  D extends React.ElementType = MenuListTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<MenuListTypeMap<P, D>, D>;
