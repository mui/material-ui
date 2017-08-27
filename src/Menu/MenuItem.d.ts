import * as React from 'react';
import { StyledComponent } from '..';
import { ListItemProps } from '../List';

export interface MenuItemProps extends ListItemProps {
  component?: React.ReactNode;
  role?: string;
  selected?: boolean;
}

export default class MenuItem extends StyledComponent<MenuItemProps> {}
