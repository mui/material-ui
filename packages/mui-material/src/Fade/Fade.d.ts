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
   *   enter: duration.enteringScreen,
   *   exit: duration.leavingScreen,
   * }
   */
  timeout?: TransitionProps['timeout'];
}

/**
 * The Fade transition is used by the [Modal](https://mui.com/components/modal/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/components/transitions/)
 *
 * API:
 *
 * - [Fade API](https://mui.com/api/fade/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */
export default function Fade(props: FadeProps): JSX.Element;
