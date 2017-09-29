import * as React from 'react';
import { StyledComponent } from '..';
import { PaperProps } from '../Paper';
import { TransitionDuration, TransitionHandlers } from '../internal/Transition';
import { ModalProps } from '../internal/Modal';

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
  transitionDuration?: TransitionDuration;
  theme?: Object;
  PaperProps?: Partial<PaperProps>;
} & Partial<TransitionHandlers> &
  ModalProps;

export type PopoverClassKey =
  | 'paper'
  ;

declare const Popover: StyledComponent<PopoverProps, PopoverClassKey>;

export default Popover;
