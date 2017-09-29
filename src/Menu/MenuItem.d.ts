import * as React from 'react';
import { StyledComponent } from '..';
import { ListItemProps } from '../List';

export interface MenuItemProps extends ListItemProps {
  component?: React.ReactType;
  role?: string;
  selected?: boolean;
}

export type MenuItemClassKey =
  | 'root'
  | 'selected'
  ;

declare const MenuItem: StyledComponent<MenuItemProps, MenuItemClassKey>;

export default MenuItem;
