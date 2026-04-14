import * as React from 'react';
import { TransitionProps } from '../transitions/transition';

export interface SlideProps extends TransitionProps {
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear?: boolean | undefined;
  /**
   * A single child content element.
   */
  children: React.ReactElement<unknown, any>;
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the container the Slide is transitioning from.
   */
  container?: null | Element | ((element: Element) => Element) | undefined;
  /**
   * Direction the child node will enter from.
   * @default 'down'
   */
  direction?: 'left' | 'right' | 'up' | 'down' | undefined;
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   * @default {
   *   enter: theme.transitions.easing.easeOut,
   *   exit: theme.transitions.easing.sharp,
   * }
   */
  easing?: TransitionProps['easing'] | undefined;
  /**
   * If `true`, the component will transition in.
   */
  in?: TransitionProps['in'] | undefined;
  ref?: React.Ref<unknown> | undefined;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout?: TransitionProps['timeout'] | undefined;
}

/**
 * The Slide transition is used by the [Drawer](https://mui.com/material-ui/react-drawer/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 *
 * - [Dialog](https://mui.com/material-ui/react-dialog/)
 * - [Transitions](https://mui.com/material-ui/transitions/)
 *
 * API:
 *
 * - [Slide API](https://mui.com/material-ui/api/slide/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition/#Transition-props)
 */
export default function Slide(props: SlideProps): React.JSX.Element;
