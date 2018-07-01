import * as React from 'react';
import { StandardProps } from '..';
import { MenuListProps } from '../MenuList';
import { PaperProps } from '../Paper';
import { PopoverClassKey, PopoverProps } from '../Popover';
import { ClassNameMap } from '../styles/withStyles';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface MenuProps<C = {}>
  extends StandardProps<PopoverProps<C> & Partial<TransitionHandlerProps>, MenuClassKey> {
  anchorEl?: HTMLElement;
  disableAutoFocusItem?: boolean;
  MenuListProps?: Partial<C & MenuListProps<C>>;
  PaperProps?: Partial<C & PaperProps>;
  PopoverClasses?: Partial<ClassNameMap<PopoverClassKey>>;
  transitionDuration?: TransitionProps['timeout'] | 'auto';
}

export type MenuClassKey = 'paper';

declare class Menu<C> extends React.Component<MenuProps<C>> { }

export default Menu;
