import * as React from 'react';
import { StyledComponent } from '..';
import { PaperProps } from '../Paper';
import { TransitionHandlers } from '../internal/Transition';

export type Origin = {
  horizontal: 'left' | 'center' | 'right' | number;
  vertical: 'top' | 'center' | 'bottom' | number;
};

export type PopoverProps = {
  anchorEl?: Object;
  anchorOrigin?: Origin;
  elevation?: number;
  enteredClassName?: string;
  enteringClassName?: string;
  exitedClassName?: string;
  exitingClassName?: string;
  getContentAnchorEl?: Function;
  modal?: boolean;
  onRequestClose?: Function;
  open?: boolean;
  role?: string;
  transformOrigin?: Origin;
  transitionDuration?: number | 'auto';
  theme?: Object;
} & Partial<TransitionHandlers> &
  PaperProps;

export default class Popover extends StyledComponent<PopoverProps> {}
