import * as React from 'react';
import { PopoverProps } from '../Popover';
import { MenuListProps } from '../MenuList';
import { PaperProps } from '../Paper';
import { StandardProps } from '..';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface MenuProps
  extends StandardProps<PopoverProps & Partial<TransitionHandlerProps>, MenuClassKey> {
  disableAutoFocusItem?: boolean;
  MenuListProps?: Partial<MenuListProps>;
  PaperProps?: Partial<PaperProps>;
  PopoverClasses?: PopoverProps['classes'];
  transitionDuration?: TransitionProps['timeout'] | 'auto';
}

export type MenuClassKey = 'paper';

declare const Menu: React.ComponentType<MenuProps>;

export default Menu;
