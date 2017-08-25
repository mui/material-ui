import * as React from 'react';
import { StyledComponent, StyledComponentProps } from '..';
import { PopoverProps } from '../Popover';
import { TransitionHandlers } from '../internal/Transition';
import { MenuListProps } from './MenuList';

export type MenuProps = {
  anchorEl?: HTMLElement;
  MenuListProps?: MenuListProps & StyledComponentProps<any>;
  onRequestClose?: React.EventHandler<any>;
  open?: boolean;
  transitionDuration?: number | 'auto';
} & Partial<TransitionHandlers> &
  PopoverProps;

export default class Menu extends StyledComponent<MenuProps> {}
