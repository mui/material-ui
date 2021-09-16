import * as React from 'react';
import { StandardProps, ModalManager } from '..';
import { BackdropProps } from '../Backdrop';
import { PortalProps } from '../Portal';

export interface ModalProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, never, 'children'> {
  BackdropComponent?: React.ElementType<BackdropProps>;
  BackdropProps?: Partial<BackdropProps>;
  children: React.ReactElement;
  closeAfterTransition?: boolean;
  container?: PortalProps['container'];
  disableAutoFocus?: boolean;
  /**
   * If `true`, clicking the backdrop will not fire the `onClose` callback.
   * @deprecated Use the onClose prop with the `reason` argument to filter the `backdropClick` events.
   */
  disableBackdropClick?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disablePortal?: PortalProps['disablePortal'];
  disableRestoreFocus?: boolean;
  disableScrollLock?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  manager?: ModalManager;
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the onClose prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick?: React.ReactEventHandler<{}>;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  }['bivarianceHack'];
  /**
   * Callback fired when the escape key is pressed,
   * `disableKeyboard` is false and the modal is in focus.
   * @deprecated Use the onClose prop with the `reason` argument to handle the `escapeKeyDown` events.
   */
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  /**
   * Callback fired once the children has been mounted into the `container`.
   * It signals that the `open={true}` prop took effect.
   *
   * This prop will be removed in v5, the ref can be used instead.
   * @deprecated Use the ref instead.
   */
  onRendered?: PortalProps['onRendered'];
  /**
   * If `true`, the modal is open.
   */
  open: boolean;
}

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * -   [Dialog](https://mui.com/api/dialog/)
 * -   [Drawer](https://mui.com/api/drawer/)
 * -   [Menu](https://mui.com/api/menu/)
 * -   [Popover](https://mui.com/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](https://mui.com/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 * Demos:
 *
 * - [Modal](https://mui.com/components/modal/)
 *
 * API:
 *
 * - [Modal API](https://mui.com/api/modal/)
 */
declare const Modal: React.ComponentType<ModalProps>;

export default Modal;
