import * as React from 'react';
import { StandardProps } from '..';
import { BackdropProps } from './Backdrop';
import { TransitionDuration, TransitionHandlers } from './Transition';

export interface ModalProps extends StandardProps<
  React.HtmlHTMLAttributes<HTMLDivElement> & Partial<TransitionHandlers>,
  ModalClassKey
> {
  backdropClassName?: string;
  backdropComponent?: React.ComponentType<BackdropProps>;
  backdropInvisible?: boolean;
  backdropTransitionDuration?: TransitionDuration;
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
