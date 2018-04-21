import * as React from 'react';
import { PopoverProps, PopoverClassKey } from '../Popover';
import { MenuListProps } from './MenuList';
import { PaperProps } from '../Paper';
import { StandardProps } from '..';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';
import { ClassNameMap } from '../styles/withStyles';

export interface MenuProps
  extends StandardProps<PopoverProps & Partial<TransitionHandlerProps>, MenuClassKey> {
  anchorEl?: HTMLElement;
  MenuListProps?: Partial<MenuListProps>;
  PaperProps?: Partial<PaperProps>;
  PopoverClasses?: Partial<ClassNameMap<PopoverClassKey>>;
  transitionDuration?: TransitionProps['timeout'] | 'auto';
}

export type MenuClassKey = 'paper';

declare const Menu: React.ComponentType<MenuProps>;

export default Menu;
