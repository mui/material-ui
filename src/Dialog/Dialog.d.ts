import * as React from 'react';
import { StandardProps } from '..';
import { ModalProps, ModalClassKey } from '../internal/Modal';
import { TransitionDuration } from '../internal/Transition';

export interface DialogProps extends StandardProps<
  ModalProps,
  DialogClassKey
> {
  fullScreen?: boolean;
  ignoreBackdropClick?: boolean;
  ignoreEscapeKeyUp?: boolean;
  transitionDuration?: TransitionDuration;
  maxWidth?: 'xs' | 'sm' | 'md';
  fullWidth?: boolean;
  onRequestClose?: React.EventHandler<any>;
  open?: boolean;
  transition?: Function | React.ReactElement<any>;
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
