import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps, ModalClassKey } from '../Modal';
import { TransitionDuration } from '../internal/transition';

export interface DialogProps extends StandardProps<
  ModalProps,
  DialogClassKey,
  'onBackdropClick' | 'onEscapeKeyUp'
> {
  fullScreen?: boolean;
  fullWidth?: boolean;
  ignoreBackdropClick?: boolean;
  ignoreEscapeKeyUp?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md';
  onBackdropClick?: Function;
  onClose?: React.EventHandler<any>;
  onEscapeKeyUp?: Function;
  open?: boolean;
  transition?: React.ReactType;
  transitionDuration?: TransitionDuration;
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
