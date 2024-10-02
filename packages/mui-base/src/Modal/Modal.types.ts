import * as React from 'react';
import { Simplify } from '@mui/types';
import { PortalProps } from '../Portal';
import { PolymorphicProps, SlotComponentProps } from '../utils';

export interface ModalRootSlotPropsOverrides {}
export interface ModalBackdropSlotPropsOverrides {}

export interface ModalOwnProps {
  /**
   * A single child content element.
   */
  children: React.ReactElement<any>;
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition?: boolean;
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
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
   * @default false
   */
  disableAutoFocus?: boolean;
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus?: boolean;
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown?: boolean;
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: PortalProps['disablePortal'];
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus?: boolean;
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock?: boolean;
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop?: boolean;
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted?: boolean;
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
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
   * A function called when a transition enters.
   */
  onTransitionEnter?: () => void;
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited?: () => void;
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', ModalRootSlotPropsOverrides, ModalOwnerState>;
    backdrop?: SlotComponentProps<'div', ModalBackdropSlotPropsOverrides, ModalOwnerState>;
  };
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: ModalSlots;
}

export interface ModalSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the backdrop.
   */
  backdrop?: React.ElementType;
}

export interface ModalTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: ModalOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type ModalProps<
  RootComponentType extends React.ElementType = ModalTypeMap['defaultComponent'],
> = PolymorphicProps<ModalTypeMap<{}, RootComponentType>, RootComponentType>;

export type ModalOwnerState = Simplify<
  ModalOwnProps & {
    closeAfterTransition: boolean;
    disableAutoFocus: boolean;
    disableEnforceFocus: boolean;
    disableEscapeKeyDown: boolean;
    disablePortal: boolean;
    disableRestoreFocus: boolean;
    disableScrollLock: boolean;
    exited: boolean;
    hideBackdrop: boolean;
    keepMounted: boolean;
  }
>;

export interface ModalRootSlotProps {
  children: React.ReactNode;
  className?: string;
  onKeyDown: React.KeyboardEventHandler;
  ownerState: ModalOwnerState;
  role: React.AriaRole;
}

export interface ModalBackdropSlotProps {
  'aria-hidden': React.AriaAttributes['aria-hidden'];
  children?: React.ReactNode;
  onClick: React.MouseEventHandler;
  open: boolean;
  ownerState: ModalOwnerState;
}
