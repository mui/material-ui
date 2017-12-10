import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { TransitionDuration, TransitionHandlers } from '../internal/transition';
import { ModalProps, ModalClassKey } from '../Modal';

export interface PopoverOrigin {
  horizontal: 'left' | 'center' | 'right' | number;
  vertical: 'top' | 'center' | 'bottom' | number;
}

export interface PopoverPosition {
  top: number;
  left: number;
}

export type PopoverReference = 'anchorEl' | 'anchorPosition';

export interface PopoverProps extends StandardProps<
  ModalProps & Partial<TransitionHandlers>,
  PopoverClassKey,
  'onClose'
> {
  anchorEl?: Object;
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
  anchorReference?: PopoverReference;
  elevation?: number;
  enteredClassName?: string;
  enteringClassName?: string;
  exitedClassName?: string;
  exitingClassName?: string;
  getContentAnchorEl?: Function;
  marginThreshold?: number;
  modal?: boolean;
  onClose?: Function;
  open?: boolean;
  PaperProps?: Partial<PaperProps>;
  role?: string;
  theme?: Object;
  transformOrigin?: PopoverOrigin;
  transitionDuration?: TransitionDuration;
}

export type PopoverClassKey =
  | ModalClassKey
  | 'paper'
  ;

declare const Popover: React.ComponentType<PopoverProps>;

export default Popover;
