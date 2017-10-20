import * as React from 'react';
import { StandardProps } from '..';
import { ListItemProps, ListItemClassKey } from '../List';

export interface MenuItemProps extends StandardProps<
  ListItemProps,
  MenuItemClassKey
> {
  component?: React.ReactType;
  role?: string;
  selected?: boolean;
}

export type MenuItemClassKey =
  | ListItemClassKey
  | 'selected'
  ;

declare const MenuItem: React.ComponentType<MenuItemProps>;

export default MenuItem;
