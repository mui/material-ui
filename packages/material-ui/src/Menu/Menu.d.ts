import * as React from 'react';
import { PopoverProps, PopoverClassKey } from '../Popover';
import { MenuListProps } from '../MenuList';
import { PaperProps } from '../Paper';
import { StandardProps } from '..';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';
import { ClassNameMap } from '../styles/withStyles';

export interface MenuProps<C>
  extends StandardProps<PopoverProps<C> & Partial<TransitionHandlerProps>, MenuClassKey> {
  anchorEl?: HTMLElement;
  MenuListProps?: Partial<C & MenuListProps<C>>;
  PaperProps?: Partial<C & PaperProps<C>>;
  PopoverClasses?: Partial<ClassNameMap<PopoverClassKey>>;
  transitionDuration?: TransitionProps['timeout'] | 'auto';
}

export type MenuClassKey = 'paper';

declare class Menu<C> extends React.Component<MenuProps<C>> {}

export default Menu;
