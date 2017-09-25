import * as React from 'react';
import { StyledComponent } from '..';
import { ListItemProps } from '../List';

export interface MenuItemProps extends ListItemProps {
  component?: React.ReactType;
  role?: string;
  selected?: boolean;
}

declare const MenuItem: StyledComponent<MenuItemProps>;

export default MenuItem;
