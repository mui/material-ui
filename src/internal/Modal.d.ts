import * as React from 'react';
import { StyledComponent } from '..';
import { BackdropProps } from './Backdrop';
import { TransitionDuration, TransitionHandlers } from './Transition';

export type ModalProps = {
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
} & Partial<TransitionHandlers> &
  React.HtmlHTMLAttributes<HTMLDivElement>;

export type ModalClassKey =
  | 'root'
  | 'hidden'
  ;

declare const Modal: StyledComponent<ModalProps, ModalClassKey>;

export default Modal;
