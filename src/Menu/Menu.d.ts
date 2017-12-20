import * as React from 'react';
import { PopoverProps, PopoverClassKey } from '../Popover';
import { TransitionDuration, TransitionHandlers } from '../transitions/transition';
import { MenuListProps } from './MenuList';
import { StandardProps } from '../MuiProps';

export interface MenuProps
  extends StandardProps<PopoverProps & Partial<TransitionHandlers>, MenuClassKey> {
  anchorEl?: HTMLElement;
  MenuListProps?: MenuListProps;
  onClose?: React.EventHandler<any>;
  open?: boolean;
  transitionDuration?: TransitionDuration;
}

export type MenuClassKey = PopoverClassKey | 'root';

declare const Menu: React.ComponentType<MenuProps>;

export default Menu;
