import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps, ModalClassKey } from '../internal/Modal';
import { TransitionDuration } from '../internal/transition';

export interface DialogProps extends StandardProps<
  ModalProps,
  DialogClassKey,
  'onBackdropClick' | 'onEscapeKeyUp'
> {
  fullScreen?: boolean;
  ignoreBackdropClick?: boolean;
  ignoreEscapeKeyUp?: boolean;
  transitionDuration?: TransitionDuration;
  maxWidth?: 'xs' | 'sm' | 'md';
  fullWidth?: boolean;
  onBackdropClick?: Function;
  onEscapeKeyUp?: Function;
  onRequestClose?: React.EventHandler<any>;
  open?: boolean;
  transition?: React.ReactType;
}

export type DialogClassKey =
  | ModalClassKey
  | 'root'
  | 'paper'
  | 'paperWidthXs'
  | 'paperWidthSm'
  | 'paperWidthMd'
  | 'fullWidth'
  | 'fullScreen'
  ;

declare const Dialog: React.ComponentType<DialogProps>;

export default Dialog;
