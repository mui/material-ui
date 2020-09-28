import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { TransitionProps } from '../transitions/transition';
import { PopperProps } from '../Popper/Popper';

export interface TooltipProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow?: boolean;
  /**
   * Tooltip reference element.
   */
  children: React.ReactElement<any, any>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the Popper component. */
    popper?: string;
    /** Styles applied to the Popper component if `interactive={true}`. */
    popperInteractive?: string;
    /** Styles applied to the Popper component if `arrow={true}`. */
    popperArrow?: string;
    /** Styles applied to the tooltip (label wrapper) element. */
    tooltip?: string;
    /** Styles applied to the tooltip (label wrapper) element if `arrow={true}`. */
    tooltipArrow?: string;
    /** Styles applied to the arrow element. */
    arrow?: string;
    /** Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
    touch?: string;
    /** Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
    tooltipPlacementLeft?: string;
    /** Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
    tooltipPlacementRight?: string;
    /** Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
    tooltipPlacementTop?: string;
    /** Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
    tooltipPlacementBottom?: string;
  };
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild?: boolean;
  /**
   * Do not respond to focus events.
   * @default false
   */
  disableFocusListener?: boolean;
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener?: boolean;
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener?: boolean;
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay?: number;
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay?: number;
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay?: number;
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id?: string;
  /**
   * Makes a tooltip interactive, i.e. will not close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  interactive?: boolean;
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay?: number;
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay?: number;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent | Event) => void;
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   */
  onOpen?: (event: React.SyntheticEvent) => void;
  /**
   * If `true`, the tooltip is shown.
   */
  open?: boolean;
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent?: React.ComponentType<PopperProps>;
  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   */
  PopperProps?: Partial<PopperProps>;
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: NonNullable<React.ReactNode>;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent?: React.ComponentType<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps?: TransitionProps;
}

export type TooltipClassKey = keyof NonNullable<TooltipProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Tooltips](https://material-ui.com/components/tooltips/)
 *
 * API:
 *
 * - [Tooltip API](https://material-ui.com/api/tooltip/)
 */
export default function Tooltip(props: TooltipProps): JSX.Element;
