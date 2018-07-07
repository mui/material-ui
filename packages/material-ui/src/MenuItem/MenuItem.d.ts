import * as React from 'react';
import { StandardProps } from '..';
import { ListItemProps } from '../ListItem';

export interface MenuItemProps<C = {}> extends StandardProps<ListItemProps<C>, MenuItemClassKey> {
  component?: React.ReactType<C>;
  role?: string;
  selected?: boolean;
}

export type MenuItemClassKey = 'root' | 'selected';

declare class MenuItem<C> extends React.Component<C & MenuItemProps<C>> {}

export default MenuItem;
