import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { ModalProps } from '../Modal';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface PopoverOrigin {
  vertical: 'top' | 'center' | 'bottom' | number;
  horizontal: 'left' | 'center' | 'right' | number;
}

export interface PopoverPosition {
  top: number;
  left: number;
}

export type PopoverReference = 'anchorEl' | 'anchorPosition' | 'none';

export interface PopoverProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, PopoverClassKey, 'children'> {
  action?: React.Ref<PopoverActions>;
  anchorEl?: null | Element | ((element: Element) => Element);
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
  anchorReference?: PopoverReference;
  children?: React.ReactNode;
  elevation?: number;
  getContentAnchorEl?: null | ((element: Element) => Element);
  marginThreshold?: number;
  modal?: boolean;
  PaperProps?: Partial<PaperProps>;
  role?: string;
  transformOrigin?: PopoverOrigin;
  TransitionComponent?: React.ComponentType<TransitionProps>;
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  TransitionProps?: TransitionProps;
}

export type PopoverClassKey = 'root' | 'paper';

export interface PopoverActions {
  updatePosition(): void;
}

declare const Popover: React.ComponentType<PopoverProps>;

export default Popover;
