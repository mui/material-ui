import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import { ListProps } from '../List/ListProps';

export type MenuListSlot = 'root';

export interface MenuActions extends MenuUnstyledActions {}

export interface MenuListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P &
    ListProps & {
      /**
       * A ref with imperative actions.
       * It allows to select the first or last menu item.
       */
      actions?: React.Ref<MenuUnstyledActions>;
    };
  defaultComponent: D;
}

export type MenuListProps<
  D extends React.ElementType = MenuListTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<MenuListTypeMap<P, D>, D>;
