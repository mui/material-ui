import * as React from 'react';
import { SxProps } from '@mui/system';
import { SlotComponentProps } from '@mui/utils';
import { BackdropProps, InternalStandardProps as StandardProps } from '..';
import Paper, { PaperProps } from '../Paper';
import Modal, { ModalProps } from '../Modal';
import { Theme } from '../styles';
import { TransitionProps } from '../transitions/transition';
import { PopoverClasses } from './popoverClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface PopoverSlots {
  /**
   * The component used for the root slot.
   * @default Modal
   */
  root: React.ElementType;
  /**
   * The component used for the paper slot.
   * @default Paper
   */
  paper: React.ElementType;
  /**
   * The component used for the transition slot.
   * @default Grow
   */
  transition: React.ElementType;
  /**
   * The component used for the backdrop slot.
   * @default Backdrop
   */
  backdrop: React.ElementType;
}

export interface PopoverRootSlotPropsOverrides {}
export interface PopoverPaperSlotPropsOverrides {}
export interface PopoverTransitionSlotPropsOverrides {}
export interface PopoverBackdropSlotPropsOverrides {}

export type PopoverSlotsAndSlotProps = CreateSlotsAndSlotProps<
  PopoverSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the [Modal](https://mui.com/material-ui/api/modal/#props) component.
     */
    root: SlotProps<typeof Modal, PopoverRootSlotPropsOverrides, PopoverOwnerState>;
    /**
     * Props forwarded to the paper slot.
     * By default, the avaible props are based on the [Paper](https://mui.com/material-ui/api/paper/#props) component.
     */
    paper: SlotProps<typeof Paper, PopoverPaperSlotPropsOverrides, PopoverOwnerState>;
    /**
     * Props forwarded to the transition slot.
     * By default, the avaible props are based on the [Grow](https://mui.com/material-ui/api/grow/#props) component.
     */
    transition: SlotComponentProps<
      // use SlotComponentProps because transition slot does not support `component` and `sx` prop
      React.ElementType,
      TransitionProps & PopoverTransitionSlotPropsOverrides,
      PopoverOwnerState
    >;
    /**
     * Props forwarded to the backdrop slot.
     * By default, the avaible props are based on the [Backdrop](https://mui.com/material-ui/api/backdrop/#props) component.
     */
    backdrop: SlotProps<
      React.ElementType<BackdropProps>,
      PopoverBackdropSlotPropsOverrides,
      PopoverOwnerState
    >;
  }
>;

export interface PopoverOrigin {
  vertical: 'top' | 'center' | 'bottom' | number;
  horizontal: 'left' | 'center' | 'right' | number;
}

export interface PopoverPosition {
  top: number;
  left: number;
}

export type PopoverReference = 'anchorEl' | 'anchorPosition' | 'none';

interface PopoverVirtualElement {
  getBoundingClientRect: () => DOMRect;
  nodeType: Node['ELEMENT_NODE'];
}

export interface PopoverProps
  extends StandardProps<
      Omit<ModalProps, 'slots' | 'slotProps' | 'BackdropProps' | 'BackdropComponent'>,
      'children'
    >,
    PopoverSlotsAndSlotProps {
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action?: React.Ref<PopoverActions>;
  /**
   * An HTML element, [PopoverVirtualElement](https://mui.com/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl?:
    | null
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement);
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin?: PopoverOrigin;
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition?: PopoverPosition;
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference?: PopoverReference;
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
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
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  BackdropProps?: Partial<BackdropProps>;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<PopoverClasses>;
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: ModalProps['container'];
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation?: number;
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold?: number | null;
  onClose?: ModalProps['onClose'];
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * Props applied to the [`Paper`](https://mui.com/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps?: Partial<PaperProps<React.ElementType>>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin?: PopoverOrigin;
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @deprecated use the `slots.transition` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default Grow
   */
  TransitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<unknown, any> }
  >;
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated use the `slotProps.transition` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  TransitionProps?: TransitionProps;
}

export interface PopoverOwnerState extends Omit<PopoverProps, 'slots' | 'slotProps'> {}

export interface PopoverActions {
  updatePosition(): void;
}

export function getOffsetTop(rect: DOMRect, vertical: number | 'center' | 'bottom' | 'top'): number;

export function getOffsetLeft(
  rect: DOMRect,
  horizontal: number | 'center' | 'right' | 'left',
): number;

type PopoverRootProps = NonNullable<PopoverProps['slotProps']>['root'];
type PopoverPaperProps = NonNullable<PopoverProps['slotProps']>['paper'];

export declare const PopoverRoot: React.FC<PopoverRootProps>;
export declare const PopoverPaper: React.FC<PopoverPaperProps>;

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 * - [Popover](https://mui.com/material-ui/react-popover/)
 *
 * API:
 *
 * - [Popover API](https://mui.com/material-ui/api/popover/)
 * - inherits [Modal API](https://mui.com/material-ui/api/modal/)
 */
export default function Popover(props: PopoverProps): React.JSX.Element;
