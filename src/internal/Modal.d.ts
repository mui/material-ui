import * as React from 'react';
import { StandardProps } from '..';
import { BackdropProps } from './Backdrop';
import { TransitionDuration, TransitionHandlers } from './transition';

export interface ModalProps extends StandardProps<
  React.HtmlHTMLAttributes<HTMLDivElement> & Partial<TransitionHandlers>,
  ModalClassKey
> {
  BackdropClassName?: string;
  BackdropComponent?: string | React.ComponentType<BackdropProps>;
  BackdropInvisible?: boolean;
  BackdropTransitionDuration?: TransitionDuration;
  keepMounted?: boolean;
  disableBackdrop?: boolean;
  ignoreBackdropClick?: boolean;
  ignoreEscapeKeyUp?: boolean;
  modalManager?: Object;
  onBackdropClick?: React.ReactEventHandler<{}>;
  onEscapeKeyUp?: React.ReactEventHandler<{}>;
  onRequestClose?: React.ReactEventHandler<{}>;
  show?: boolean;
}

export type ModalClassKey =
  | 'root'
  | 'hidden'
  ;

declare const Modal: React.ComponentType<ModalProps>;

export default Modal;
