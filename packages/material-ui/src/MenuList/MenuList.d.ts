import * as React from 'react';
import { StandardProps } from '..';
import { ListProps, ListClassKey } from '../List';

export interface MenuListProps extends StandardProps<ListProps, MenuListClassKey, 'onKeyDown'> {
  disableListWrap?: boolean;
  onKeyDown?: React.ReactEventHandler<React.KeyboardEvent<any>>;
  // TS FIXME: infer ref from ListProps
  ref?: React.Ref<HTMLElement>;
}

export type MenuListClassKey = ListClassKey;

declare const MenuList: React.ComponentType<MenuListProps>;

export default MenuList;
