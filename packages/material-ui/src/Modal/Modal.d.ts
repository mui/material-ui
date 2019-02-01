import * as React from 'react';
import { StandardProps, ModalManager } from '..';
import { BackdropProps } from '../Backdrop';
import { PortalProps } from '../Portal';

export interface ModalProps
  extends StandardProps<React.HtmlHTMLAttributes<HTMLDivElement>, ModalClassKey> {
  BackdropComponent?: React.ReactType<BackdropProps>;
  BackdropProps?: Partial<BackdropProps>;
  closeAfterTransition?: boolean;
  container?: PortalProps['container'];
  disableAutoFocus?: boolean;
  disableBackdropClick?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disablePortal?: PortalProps['disablePortal'];
  disableRestoreFocus?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  manager?: ModalManager;
  onBackdropClick?: React.ReactEventHandler<{}>;
  onClose?: React.ReactEventHandler<{}>;
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  onRendered?: PortalProps['onRendered'];
  open: boolean;
}

export type ModalClassKey = 'root' | 'hidden';

declare const Modal: React.ComponentType<ModalProps>;

export default Modal;
