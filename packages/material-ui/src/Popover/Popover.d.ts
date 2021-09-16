import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { ModalProps } from '../Modal';
import { TransitionHandlerProps, TransitionProps } from '../transitions/transition';

export interface PopoverOrigin {
  vertical: 'top' | 'center' | 'bottom' | number;
  horizontal: 'left' | 'center' | 'right' | number;
}

export interface PopoverPosition {
  top: number;
  left: number;
}

export type PopoverReference = 'anchorEl' | 'anchorPosition' | 'none';

export interface PopoverProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, PopoverClassKey, 'children'> {
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action?: React.Ref<PopoverActions>;
  /**
   * A HTML element, or a function that returns it.
   * It's used to set the position of the popover.
   */
  anchorEl?: null | Element | ((element: Element) => Element);
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   */
  anchorOrigin?: PopoverOrigin;
  /**
   * This is the position that may be used
   * to set the position of the popover.
   * The coordinates are relative to
   * the application's client area.
   */
  anchorPosition?: PopoverPosition;
  /**
   * This determines which anchor prop to refer to to set
   * the position of the popover.
   */
  anchorReference?: PopoverReference;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * A HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: ModalProps['container'];
  /**
   * The elevation of the popover.
   */
  elevation?: number;
  /**
   * This function is called in order to retrieve the content anchor element.
   * It's the opposite of the `anchorEl` prop.
   * The content anchor element should be an element inside the popover.
   * It's used to correctly scroll and set the position of the popover.
   * The positioning strategy tries to make the content anchor element just above the
   * anchor element.
   */
  getContentAnchorEl?: null | ((element: Element) => Element);
  /**
   * Specifies how close to the edge of the window the popover can appear.
   */
  marginThreshold?: number;
  onClose?: ModalProps['onClose'];
  /**
   * Callback fired before the component is entering.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEnter?: TransitionHandlerProps['onEnter'];
  /**
   * Callback fired when the component has entered.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEntered?: TransitionHandlerProps['onEntered'];
  /**
   * Callback fired when the component is entering.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onEntering?: TransitionHandlerProps['onEntering'];
  /**
   * Callback fired before the component is exiting.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExit?: TransitionHandlerProps['onExit'];
  /**
   * Callback fired when the component has exited.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExited?: TransitionHandlerProps['onExited'];
  /**
   * Callback fired when the component is exiting.
   * @deprecated Use the `TransitionProps` prop instead.
   */
  onExiting?: TransitionHandlerProps['onExiting'];
  /**
   * If `true`, the popover is visible.
   */
  open: boolean;
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps?: Partial<PaperProps>;
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   */
  transformOrigin?: PopoverOrigin;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: React.ComponentType<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps;
}

export type PopoverClassKey = 'root' | 'paper';

export interface PopoverActions {
  updatePosition(): void;
}

/**
 *
 * Demos:
 *
 * - [Menus](https://mui.com/components/menus/)
 * - [Popover](https://mui.com/components/popover/)
 *
 * API:
 *
 * - [Popover API](https://mui.com/api/popover/)
 * - inherits [Modal API](https://mui.com/api/modal/)
 */
export default function Popover(props: PopoverProps): JSX.Element;
