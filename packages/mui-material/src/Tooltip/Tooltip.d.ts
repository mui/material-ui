import * as React from 'react';
import { MUIStyledCommonProps, SxProps } from '@mui/system';
import { PopperProps } from '@mui/material/Popper';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { TransitionProps } from '../transitions/transition';
import { TooltipClasses } from './tooltipClasses';

export interface TooltipComponentsPropsOverrides {}

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
  classes?: Partial<TooltipClasses>;
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components?: {
    Popper?: React.ElementType<PopperProps>;
    Transition?: React.ElementType;
    Tooltip?: React.ElementType;
    Arrow?: React.ElementType;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps?: {
    popper?: Partial<PopperProps> & TooltipComponentsPropsOverrides;
    transition?: TransitionProps & TooltipComponentsPropsOverrides;
    tooltip?: React.HTMLProps<HTMLDivElement> &
      MUIStyledCommonProps &
      TooltipComponentsPropsOverrides;
    arrow?: React.HTMLProps<HTMLSpanElement> &
      MUIStyledCommonProps &
      TooltipComponentsPropsOverrides;
  };
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild?: boolean;
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener?: boolean;
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener?: boolean;
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive?: boolean;
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
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor?: boolean;
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id?: string;
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
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent | Event) => void;
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen?: (event: React.SyntheticEvent) => void;
  /**
   * If `true`, the component is shown.
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
  PopperComponent?: React.JSXElementConstructor<PopperProps>;
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps?: Partial<PopperProps>;
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps?: {
    popper?: Partial<PopperProps> & TooltipComponentsPropsOverrides;
    transition?: TransitionProps & TooltipComponentsPropsOverrides;
    tooltip?: React.HTMLProps<HTMLDivElement> &
      MUIStyledCommonProps &
      TooltipComponentsPropsOverrides;
    arrow?: React.HTMLProps<HTMLSpanElement> &
      MUIStyledCommonProps &
      TooltipComponentsPropsOverrides;
  };
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots?: {
    popper?: React.ElementType<PopperProps>;
    transition?: React.ElementType;
    tooltip?: React.ElementType;
    arrow?: React.ElementType;
  };
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: React.ReactNode;
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<any, any> }
  >;
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps?: TransitionProps;
}

/**
 *
 * Demos:
 *
 * - [Tooltip](https://mui.com/material-ui/react-tooltip/)
 *
 * API:
 *
 * - [Tooltip API](https://mui.com/material-ui/api/tooltip/)
 */
export default function Tooltip(props: TooltipProps): JSX.Element;
