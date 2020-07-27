import * as React from 'react';
import { StandardProps } from '..';
import { BackdropProps } from '../Backdrop';
import { PortalProps } from '../Portal';

export interface ModalProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, never, 'children'> {
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   */
  BackdropComponent?: React.ElementType<BackdropProps>;
  /**
   * Props applied to the [`Backdrop`](/api/backdrop/) element.
   */
  BackdropProps?: Partial<BackdropProps>;
  /**
   * A single child content element.
   */
  children: React.ReactElement;

  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   */
  closeAfterTransition?: boolean;
  /**
   * A HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalProps['container'];
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableAutoFocus?: boolean;
  /**
   * If `true`, clicking the backdrop will not fire `onClose`.
   */
  disableBackdropClick?: boolean;
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   */
  disableEnforceFocus?: boolean;
  /**
   * If `true`, hitting escape will not fire `onClose`.
   */
  disableEscapeKeyDown?: boolean;
  /**
   * The `children` will be inside the DOM hierarchy of the parent component.
   */
  disablePortal?: PortalProps['disablePortal'];
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden.
   */
  disableRestoreFocus?: boolean;
  /**
   * Disable the scroll lock behavior.
   */
  disableScrollLock?: boolean;
  /**
   * If `true`, the backdrop is not rendered.
   */
  hideBackdrop?: boolean;
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   */
  keepMounted?: boolean;
  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick?: React.ReactEventHandler<{}>;
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  }['bivarianceHack'];
  /**
   * Callback fired when the escape key is pressed,
   * `disableEscapeKeyDown` is false and the modal is in focus.
   */
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  /**
   * Callback fired once the children has been mounted into the `container`.
   * It signals that the `open={true}` prop took effect.
   *
   * This prop will be deprecated and removed in v5, the ref can be used instead.
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
 * -   [Dialog](https://material-ui.com/api/dialog/)
 * -   [Drawer](https://material-ui.com/api/drawer/)
 * -   [Menu](https://material-ui.com/api/menu/)
 * -   [Popover](https://material-ui.com/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](https://material-ui.com/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 * Demos:
 *
 * - [Modal](https://material-ui.com/components/modal/)
 *
 * API:
 *
 * - [Modal API](https://material-ui.com/api/modal/)
 */
declare const Modal: React.ComponentType<ModalProps>;

export default Modal;
