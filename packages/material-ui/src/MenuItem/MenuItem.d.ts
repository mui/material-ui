import * as React from 'react';
import { StandardProps } from '..';
import { ListItemProps } from '../ListItem';

export interface MenuItemProps extends StandardProps<ListItemProps, MenuItemClassKey> {
  component?: React.ReactType<MenuItemProps>;
  role?: string;
}

export type MenuItemClassKey = 'root' | 'gutters' | 'selected';

declare const MenuItem: React.ComponentType<MenuItemProps>;

export default MenuItem;
