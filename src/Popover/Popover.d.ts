import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { TransitionDuration, TransitionHandlers } from '../internal/transition';
import { ModalProps, ModalClassKey } from '../internal/Modal';

export interface Origin {
  horizontal: 'left' | 'center' | 'right' | number;
  vertical: 'top' | 'center' | 'bottom' | number;
}

export interface PopoverProps extends StandardProps<
  ModalProps & Partial<TransitionHandlers>,
  PopoverClassKey,
  'onRequestClose'
> {
  anchorEl?: Object;
  anchorOrigin?: Origin;
  elevation?: number;
  enteredClassName?: string;
  enteringClassName?: string;
  exitedClassName?: string;
  exitingClassName?: string;
  getContentAnchorEl?: Function;
  marginThreshold?: number;
  modal?: boolean;
  onRequestClose?: Function;
  open?: boolean;
  role?: string;
  transformOrigin?: Origin;
  transitionDuration?: TransitionDuration;
  theme?: Object;
  PaperProps?: Partial<PaperProps>;
}

export type PopoverClassKey =
  | ModalClassKey
  | 'paper'
  ;

declare const Popover: React.ComponentType<PopoverProps>;

export default Popover;
