import * as React from 'react';
import { StandardProps } from '..';
import { ListProps, ListClassKey } from '../List';

export interface MenuListProps<C> extends StandardProps<ListProps<C>, MenuListClassKey, 'onKeyDown'> {
  onKeyDown?: React.ReactEventHandler<React.KeyboardEvent<any>>;
}

export type MenuListClassKey = ListClassKey;

declare class MenuList<C> extends React.Component<C & MenuListProps<C>> {}

export default MenuList;
