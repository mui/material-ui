import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverrideProps } from '@mui/types';
import { SlotComponentProps } from '../utils/types';
import { PortalProps } from '../Portal';
import { Theme } from '../styles';
import Backdrop, { BackdropProps } from '../Backdrop';
import { OverridableComponent } from '../OverridableComponent';
import { ModalClasses } from './modalClasses';

export interface ModalComponentsPropsOverrides {}

export interface ModalOwnerState extends ModalProps {
  exited: boolean;
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

export interface ModalOwnProps {
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent?: React.ElementType<BackdropProps>;
  /**
   * Props applied to the [`Backdrop`](https://mui.com/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps?: Partial<BackdropProps>;
  /**
   * A single child content element.
   */
  children: React.ReactElement<unknown>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ModalClasses>;
  /**
   * @ignore
   */
  className?: string;
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition?: boolean;
  /**
   * The components used for each slot inside.
   *
   * @deprecated Use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Backdrop?: React.ElementType;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<'div', ModalComponentsPropsOverrides, ModalOwnerState>;
    backdrop?: SlotComponentProps<typeof Backdrop, ModalComponentsPropsOverrides, ModalOwnerState>;
  };
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
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: ModalSlots;
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', ModalComponentsPropsOverrides, ModalOwnerState>;
    backdrop?: SlotComponentProps<typeof Backdrop, ModalComponentsPropsOverrides, ModalOwnerState>;
  };
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface ModalTypeMap<
  RootComponent extends React.ElementType = 'div',
  AdditionalProps = {},
> {
  props: AdditionalProps & ModalOwnProps;
  defaultComponent: RootComponent;
}

type ModalRootProps = NonNullable<ModalTypeMap['props']['slotProps']>['root'];

export declare const ModalRoot: React.FC<ModalRootProps>;

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * * [Dialog](https://mui.com/material-ui/api/dialog/)
 * * [Drawer](https://mui.com/material-ui/api/drawer/)
 * * [Menu](https://mui.com/material-ui/api/menu/)
 * * [Popover](https://mui.com/material-ui/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](https://mui.com/material-ui/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 *
 * Demos:
 *
 * - [Modal](https://mui.com/material-ui/react-modal/)
 *
 * API:
 *
 * - [Modal API](https://mui.com/material-ui/api/modal/)
 */
declare const Modal: OverridableComponent<ModalTypeMap>;

export type ModalProps<
  RootComponent extends React.ElementType = ModalTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ModalTypeMap<RootComponent, AdditionalProps>, RootComponent> & {
  component?: React.ElementType;
};

export default Modal;
