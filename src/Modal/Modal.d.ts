import * as React from 'react';
import { StandardProps, ModalManager } from '..';
import { BackdropProps } from './Backdrop';
import { PortalProps } from '../Portal';

export interface ModalProps
  extends StandardProps<
      React.HtmlHTMLAttributes<HTMLDivElement> & Partial<PortalProps>,
      ModalClassKey
    > {
  BackdropComponent?: React.ReactType<BackdropProps>;
  BackdropProps?: BackdropProps;
  disableAutoFocus?: boolean;
  disableBackdropClick?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disableRestoreFocus?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  manager?: ModalManager;
  onBackdropClick?: React.ReactEventHandler<{}>;
  onClose?: React.ReactEventHandler<{}>;
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  open: boolean;
}

export type ModalClassKey = 'root' | 'hidden';

declare const Modal: React.ComponentType<ModalProps>;

export default Modal;
