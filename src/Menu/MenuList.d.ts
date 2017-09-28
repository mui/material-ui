import * as React from 'react';
import { StyledComponent } from '..';
import { ListProps } from '../List';

export type MenuListProps = {
  onKeyDown?: React.ReactEventHandler<React.KeyboardEvent<any>>;
} & ListProps;

export type MenuListClassKey = never;

declare const MenuList: StyledComponent<MenuListProps, MenuListClassKey>;

export default MenuList;
