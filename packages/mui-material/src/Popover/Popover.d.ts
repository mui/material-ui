import * as React from 'react';
import { SxProps } from '@mui/system';
import { SlotComponentProps } from '@mui/utils';
import { InternalStandardProps as StandardProps } from '..';
import Paper, { PaperProps } from '../Paper';
import Modal, { ModalOwnerState, ModalProps } from '../Modal';
import { Theme } from '../styles';
import { TransitionProps } from '../transitions/transition';
import { PopoverClasses } from './popoverClasses';

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
  extends StandardProps<Omit<ModalProps, 'slots' | 'slotProps'>, 'children'> {
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action?: React.Ref<PopoverActions>;
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
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
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps?: Partial<PaperProps<React.ElementType>>;
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
    paper?: React.ElementType;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<typeof Modal, {}, ModalOwnerState>;
    paper?: SlotComponentProps<typeof Paper, {}, {}>;
  };
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
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<any, any> }
  >;
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps?: TransitionProps;
}

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
