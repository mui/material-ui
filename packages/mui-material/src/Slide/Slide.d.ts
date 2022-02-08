import * as React from 'react';
import { TransitionProps } from '../transitions/transition';

export interface SlideProps extends TransitionProps {
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
   * An HTML element, or a function that returns one.
   * It's used to set the container the Slide is transitioning from.
   */
  container?: null | Element | ((element: Element) => Element);
  /**
   * Direction the child node will enter from.
   * @default 'down'
   */
  direction?: 'left' | 'right' | 'up' | 'down';
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   * @default {
   *   enter: easing.easeOut,
   *   exit: easing.sharp,
   * }
   */
  easing?: TransitionProps['easing'];
  /**
   * If `true`, the component will transition in.
   */
  in?: TransitionProps['in'];
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
 * The Slide transition is used by the [Drawer](https://mui.com/components/drawers/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 *
 * - [Dialogs](https://mui.com/components/dialogs/)
 * - [Transitions](https://mui.com/components/transitions/)
 *
 * API:
 *
 * - [Slide API](https://mui.com/api/slide/)
 * - inherits [Transition API](http://reactcommunity.org/react-transition-group/transition/#Transition-props)
 */
export default function Slide(props: SlideProps): JSX.Element;
