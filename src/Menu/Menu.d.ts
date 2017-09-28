import * as React from 'react';
import { StyledComponent, StyledComponentProps } from '..';
import { PopoverProps } from '../Popover';
import { TransitionDuration, TransitionHandlers } from '../internal/Transition';
import { MenuListProps } from './MenuList';

export type MenuProps = {
  anchorEl?: HTMLElement;
  MenuListProps?: MenuListProps & StyledComponentProps<any>;
  onRequestClose?: React.EventHandler<any>;
  open?: boolean;
  transitionDuration?: TransitionDuration;
} & Partial<TransitionHandlers> &
  PopoverProps;

declare const Menu: StyledComponent<MenuProps>;

export default Menu;
