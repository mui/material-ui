import * as React from 'react';
import { TransitionProps } from '../transitions/transition';

export interface FadeProps extends Omit<TransitionProps, 'children'> {
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear?: boolean;
  /**
   * A single child content element.
   */
  children: React.ReactElement<unknown, any>;
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
 * The Fade transition is used by the [Modal](https://v6.mui.com/material-ui/react-modal/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 *
 * - [Transitions](https://v6.mui.com/material-ui/transitions/)
 *
 * API:
 *
 * - [Fade API](https://v6.mui.com/material-ui/api/fade/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition/#Transition-props)
 */
export default function Fade(props: FadeProps): React.JSX.Element;
