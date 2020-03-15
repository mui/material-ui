import * as React from 'react';
import { StandardProps } from '..';
import { ListProps, ListClassKey } from '../List';

export interface MenuListProps extends StandardProps<ListProps, MenuListClassKey> {
  autoFocus?: boolean;
  autoFocusItem?: boolean;
  disableListWrap?: boolean;
  variant?: 'menu' | 'selectedMenu';
}

export type MenuListClassKey = ListClassKey;

/**
 * A permanently displayed menu following https://www.w3.org/TR/wai-aria-practices/#menubutton.
 * It's exposed to help customization of the [`Menu`](/api/menu/) component. If you
 * use it separately you need to move focus into the component manually. Once
 * the focus is placed inside the component it is fully keyboard accessible.
 *
 * Demos:
 * - {@link https://material-ui.com/components/menus/ Menus}
 *
 * API:
 * - {@link https://material-ui.com/api/MenuList MenuList API}
 * - inherits {@link https://material-ui.com/api/list/ List API}
 */
declare const MenuList: React.ComponentType<MenuListProps>;

export default MenuList;
