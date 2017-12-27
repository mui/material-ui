import * as React from 'react';
import { PopoverProps, PopoverClassKey } from '../Popover';
import { TransitionDuration, TransitionHandlers } from '../internal/transition';
import { MenuListProps } from './MenuList';
import { StandardProps } from '..';

export interface MenuProps
  extends StandardProps<PopoverProps & Partial<TransitionHandlers>, MenuClassKey> {
  anchorEl?: HTMLElement;
  MenuListProps?: MenuListProps;
  transitionDuration?: TransitionDuration;
}

export type MenuClassKey = PopoverClassKey | 'root';

declare const Menu: React.ComponentType<MenuProps>;

export default Menu;
