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

export interface PopoverProps
  extends StandardProps<ModalProps & Partial<TransitionHandlers>, PopoverClassKey, 'children'> {
  action?: (actions: PopoverActions) => void;
  anchorEl?: HTMLElement;
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
  anchorReference?: PopoverReference;
  children?: React.ReactNode;
  elevation?: number;
  getContentAnchorEl?: (element: HTMLElement) => HTMLElement;
  marginThreshold?: number;
  modal?: boolean;
  PaperProps?: Partial<PaperProps>;
  role?: string;
  transformOrigin?: PopoverOrigin;
  transition?: React.ReactType;
  transitionDuration?: TransitionDuration;
}

export type PopoverClassKey = ModalClassKey | 'paper';

export interface PopoverActions {
  updatePosition(): void;
}

declare const Popover: React.ComponentType<PopoverProps>;

export default Popover;
