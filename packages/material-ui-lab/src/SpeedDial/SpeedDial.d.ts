import * as React from 'react';
import { StandardProps } from '@material-ui/core';
import { FabProps } from '@material-ui/core/Fab';
import { TransitionHandlerProps, TransitionProps } from '@material-ui/core/transitions';

export type CloseReason = 'toggle' | 'blur' | 'mouseLeave' | 'escapeKeyDown';
export type OpenReason = 'toggle' | 'focus' | 'mouseEnter';

export interface SpeedDialProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement> & Partial<TransitionHandlerProps>,
    SpeedDialClassKey,
    'children'
  > {
  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
   */
  children?: React.ReactNode;
  /**
   * The aria-label of the button element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: string;
  /**
   * The direction the actions open relative to the floating action button.
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  /**
   * If `true`, the SpeedDial will be hidden.
   */
  hidden?: boolean;
  /**
   * Props applied to the [`Fab`](/api/fab/) element.
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
   * If `true`, the SpeedDial is open.
   */
  open: boolean;
  /**
   * The icon to display in the SpeedDial Fab when the SpeedDial is open.
   */
  openIcon?: React.ReactNode;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: React.ComponentType<TransitionProps>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps['timeout'];
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps;
}

export type SpeedDialClassKey =
  | 'root'
  | 'fab'
  | 'directionUp'
  | 'directionDown'
  | 'directionLeft'
  | 'directionRight'
  | 'actions'
  | 'actionsClosed';

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
