import * as React from 'react';
import { StyledComponent } from '..';
import { TransitionDuration, TransitionHandlers } from './transition';

export type ModalProps = {
  BackdropClassName?: string;
  BackdropComponent?: React.ReactType;
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
} & Partial<TransitionHandlers> &
  React.HtmlHTMLAttributes<HTMLDivElement>;

export type ModalClassKey =
  | 'root'
  | 'hidden'
  ;

declare const Modal: StyledComponent<ModalProps, ModalClassKey>;

export default Modal;
