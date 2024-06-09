import * as React from 'react';
import { TransitionProps } from '../transitions/transition';

export interface ZoomProps extends TransitionProps {
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear?: boolean;
  /**
   * A single child content element.
   */
  children: React.ReactElement<any, any>;
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing?: TransitionProps['easing'];
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean;
  ref?: React.Ref<unknown>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout?: TransitionProps['timeout'];
}

/**
 * The Zoom transition can be used for the floating variant of the
 * [Button](https://next.mui.com/material-ui/react-button/#floating-action-buttons) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 *
 * - [Transitions](https://next.mui.com/material-ui/transitions/)
 *
 * API:
 *
 * - [Zoom API](https://next.mui.com/material-ui/api/zoom/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition/#Transition-props)
 */
export default function Zoom(props: ZoomProps): React.JSX.Element;
