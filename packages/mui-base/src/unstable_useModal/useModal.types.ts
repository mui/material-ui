import { PortalProps } from '../Portal';

export interface UseModalRootSlotOwnProps {
  role: React.AriaRole;
  onKeyDown: React.KeyboardEventHandler;
  ref: React.RefCallback<Element> | null;
}

export interface UseModalBackdropSlotOwnProps {
  'aria-hidden': React.AriaAttributes['aria-hidden'];
  onClick: React.MouseEventHandler;
  open?: boolean;
}

export type UseModalBackdropSlotProps<TOther = {}> = TOther & UseModalBackdropSlotOwnProps;

export type UseModalRootSlotProps<TOther = {}> = TOther & UseModalRootSlotOwnProps;

export type UseModalParameters = {
  'aria-hidden'?: React.AriaAttributes['aria-hidden'];
  /**
   * A single child content element.
   */
  children: React.ReactElement;
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition?: boolean;
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalProps['container'];
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown?: boolean;
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock?: boolean;
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
  onKeyDown?: React.KeyboardEventHandler;
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
  ref: React.Ref<Element>;
};

export interface UseModalReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: (externalProps?: any) => React.HTMLAttributes<HTMLDivElement>;
  /**
   * Resolver for the backdrop slot's props.
   * @param externalProps props for the backdrop slot
   * @returns props that should be spread on the backdrop slot
   */
  getBackdropProps: (externalProps?: any) => React.HTMLAttributes<HTMLDivElement>;
  /**
   * Resolver for the transition related props.
   * @param externalProps props for the transition element
   * @returns props that should be spread on the transition element
   */
  getTransitionProps: (externalProps?: any) => { onEnter: () => void; onExited: () => void };
  /**
   * A ref to the component's root DOM element.
   */
  rootRef: React.Ref<Element>;
  /**
   * A ref to the component's portal DOM element.
   */
  portalRef: React.Ref<Element>;
  /**
   * If `true`, the modal is the top most one.
   */
  isTopModal: () => boolean;
  /**
   * If `true`, the exiting transition finished (to be used for unmounting the component).
   */
  exited: boolean;
  /**
   * If `true`, the component's child is transition component.
   */
  hasTransition: boolean;
}
