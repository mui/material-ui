import * as React from 'react';
import { StyledComponent } from '..';
import { ListProps } from '../List';

export type MenuListProps = {
  onKeyDown?: React.ReactEventHandler<React.KeyboardEvent<any>>;
} & ListProps;

declare const MenuList: StyledComponent<MenuListProps>;

export default MenuList;
