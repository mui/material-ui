import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '..';
import { FabProps } from '../Fab';
import { TransitionHandlerProps, TransitionProps } from '../transitions';

export type CloseReason = 'toggle' | 'blur' | 'mouseLeave' | 'escapeKeyDown';
export type OpenReason = 'toggle' | 'focus' | 'mouseEnter';

export interface SpeedDialProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement> & Partial<TransitionHandlerProps>,
    'children'
  > {
  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the Fab component. */
    fab?: string;
    /** Styles applied to the root element if direction="up" */
    directionUp?: string;
    /** Styles applied to the root element if direction="down" */
    directionDown?: string;
    /** Styles applied to the root element if direction="left" */
    directionLeft?: string;
    /** Styles applied to the root element if direction="right" */
    directionRight?: string;
    /** Styles applied to the actions (`children` wrapper) element. */
    actions?: string;
    /** Styles applied to the actions (`children` wrapper) element if `open={false}`. */
    actionsClosed?: string;
  };
  /**
   * The aria-label of the button element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: string;
  /**
   * The direction the actions open relative to the floating action button.
   * @default 'up'
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  /**
   * If `true`, the SpeedDial is hidden.
   * @default false
   */
  hidden?: boolean;
  /**
   * Props applied to the [`Fab`](/api/fab/) element.
   * @default {}
   */
  FabProps?: Partial<FabProps>;
  /**
   * The icon to display in the SpeedDial Fab. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon?: React.ReactNode;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"blur"`, `"mouseLeave"`, `"escapeKeyDown"`.
   */
  onClose?: (event: React.SyntheticEvent<{}>, reason: CloseReason) => void;
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"focus"`, `"mouseEnter"`.
   */
  onOpen?: (event: React.SyntheticEvent<{}>, reason: OpenReason) => void;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean;
  /**
   * The icon to display in the SpeedDial Fab when the SpeedDial is open.
   */
  openIcon?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Zoom
   */
  TransitionComponent?: React.ComponentType<TransitionProps>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: duration.enteringScreen,
   *   exit: duration.leavingScreen,
   * }
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps?: TransitionProps;
}

export type SpeedDialClassKey = keyof NonNullable<SpeedDialProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Speed Dial](https://material-ui.com/components/speed-dial/)
 *
 * API:
 *
 * - [SpeedDial API](https://material-ui.com/api/speed-dial/)
 */
export default function SpeedDial(props: SpeedDialProps): JSX.Element;
