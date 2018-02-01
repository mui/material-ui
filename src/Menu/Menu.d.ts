import * as React from 'react';
import { PopoverProps, PopoverClassKey } from '../Popover';
import { MenuListProps } from './MenuList';
import { StandardProps } from '..';
import { TransitionHandlers, TransitionDuration } from '../transitions/transition';

export interface MenuProps
  extends StandardProps<PopoverProps & Partial<TransitionHandlers>, MenuClassKey> {
  anchorEl?: HTMLElement;
  MenuListProps?: Partial<MenuListProps>;
  transitionDuration?: TransitionProps['timeout'];
}

export type MenuClassKey = PopoverClassKey | 'root';

declare const Menu: React.ComponentType<MenuProps>;

export default Menu;
