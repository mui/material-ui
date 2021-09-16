import * as React from 'react';
import { PopoverProps } from '../Popover';
import { MenuListProps } from '../MenuList';
import { PaperProps } from '../Paper';
import { StandardProps } from '..';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface MenuProps
  extends StandardProps<PopoverProps & Partial<TransitionHandlerProps>, MenuClassKey> {
  /**
   * A HTML element, or a function that returns it.
   * It's used to set the position of the menu.
   * @document
   */
  anchorEl?: PopoverProps['anchorEl'];
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   */
  autoFocus?: boolean;
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children?: React.ReactNode;
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   */
  disableAutoFocusItem?: boolean;
  /**
   * Props applied to the [`MenuList`](/api/menu-list/) element.
   */
  MenuListProps?: Partial<MenuListProps>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose?: PopoverProps['onClose'];
  /**
   * Callback fired before the Menu enters.
   * @deprecated Use the `TransitionProps` prop instead.
   * @document
   */
  onEnter?: PopoverProps['onEnter'];
  /**
   * Callback fired when the Menu has entered.
   * @deprecated Use the `TransitionProps` prop instead.
   * @document
   */
  onEntered?: PopoverProps['onEntered'];
  /**
   * Callback fired when the Menu is entering.
   * @deprecated Use the `TransitionProps` prop instead.
   * @document
   */
  onEntering?: PopoverProps['onEntering'];
  /**
   * Callback fired before the Menu exits.
   * @deprecated Use the `TransitionProps` prop instead.
   * @document
   */
  onExit?: PopoverProps['onExit'];
  /**
   * Callback fired when the Menu has exited.
   * @deprecated Use the `TransitionProps` prop instead.
   * @document
   */
  onExited?: PopoverProps['onExited'];
  /**
   * Callback fired when the Menu is exiting.
   * @deprecated Use the `TransitionProps` prop instead.
   * @document
   */
  onExiting?: PopoverProps['onExiting'];
  /**
   * If `true`, the menu is visible.
   */
  open: boolean;
  /**
   * `classes` prop applied to the [`Popover`](/api/popover/) element.
   */
  PopoverClasses?: PopoverProps['classes'];
  /**
   * The length of the transition in `ms`, or 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps?: TransitionProps;
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   */
  variant?: 'menu' | 'selectedMenu';
}

export type MenuClassKey = 'paper' | 'list';

/**
 *
 * Demos:
 *
 * - [App Bar](https://mui.com/components/app-bar/)
 * - [Menus](https://mui.com/components/menus/)
 *
 * API:
 *
 * - [Menu API](https://mui.com/api/menu/)
 * - inherits [Popover API](https://mui.com/api/popover/)
 */
export default function Menu(props: MenuProps): JSX.Element;
