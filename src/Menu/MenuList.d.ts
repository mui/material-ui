import * as React from 'react';
import { StyledComponent } from '..';
import { ListProps } from '../List';
import { ListClassKey } from '../List/List'

export type MenuListProps = {
  onKeyDown?: React.ReactEventHandler<React.KeyboardEvent<any>>;
} & ListProps;

export type MenuListClassKey =
  | ListClassKey
  ;

declare const MenuList: StyledComponent<MenuListProps, MenuListClassKey>;

export default MenuList;
