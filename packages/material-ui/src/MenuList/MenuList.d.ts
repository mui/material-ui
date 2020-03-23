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
 * A permanently displayed menu following <https://www.w3.org/TR/wai-aria-practices/#menubutton>.
 * It's exposed to help customization of the [`Menu`](https://material-ui.com/api/menu/) component. If you
 * use it separately you need to move focus into the component manually. Once
 * the focus is placed inside the component it is fully keyboard accessible.
 * Demos:
 *
 * - [Menus](https://material-ui.com/components/menus/)
 *
 * API:
 *
 * - [MenuList API](https://material-ui.com/api/menu-list/)
 * - inherits [List API](https://material-ui.com/api/list/)
 */
declare const MenuList: React.ComponentType<MenuListProps>;

export default MenuList;
