import * as React from 'react';
import { ExtendList, ExtendListTypeMap } from '../List';
import { OverrideProps } from '../OverridableComponent';

export type MenuListTypeMap<P = {}, D extends React.ElementType = 'ul'> = ExtendListTypeMap<{
  props: P & {
    /**
     * If `true`, will focus the `[role="menu"]` container and move into tab order.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * If `true`, will focus the first menuitem if `variant="menu"` or selected item
     * if `variant="selectedMenu"`.
     * @default false
     */
    autoFocusItem?: boolean;
    /**
     * MenuList contents, normally `MenuItem`s.
     */
    children?: React.ReactNode;
    /**
     * If `true`, will allow focus on disabled items.
     * @default false
     */
    disabledItemsFocusable?: boolean;
    /**
     * If `true`, the menu items will not wrap focus.
     * @default false
     */
    disableListWrap?: boolean;
    /**
     * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
     * and the vertical alignment relative to the anchor element.
     * @default 'selectedMenu'
     */
    variant?: 'menu' | 'selectedMenu';
  };
  defaultComponent: D;
}>;

export type MenuListClassKey = keyof NonNullable<MenuListTypeMap['props']['classes']>;

/**
 * A permanently displayed menu following https://www.w3.org/TR/wai-aria-practices/#menubutton.
 * It's exposed to help customization of the [`Menu`](https://mui.com/api/menu/) component if you
 * use it separately you need to move focus into the component manually. Once
 * the focus is placed inside the component it is fully keyboard accessible.
 *
 * Demos:
 *
 * - [Menus](https://mui.com/components/menus/)
 *
 * API:
 *
 * - [MenuList API](https://mui.com/api/menu-list/)
 * - inherits [List API](https://mui.com/api/list/)
 */
declare const MenuList: ExtendList<MenuListTypeMap>;

export type MenuListProps<
  D extends React.ElementType = MenuListTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MenuListTypeMap<P, D>, D>;

export default MenuList;
