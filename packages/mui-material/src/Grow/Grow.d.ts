import * as React from 'react';
import { TransitionProps } from '../transitions/transition';

export interface GrowProps extends Omit<TransitionProps, 'timeout'> {
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
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout?: TransitionProps['timeout'] | 'auto';
}

/**
 * The Grow transition is used by the [Tooltip](https://mui.com/material-ui/react-tooltip/) and
 * [Popover](https://mui.com/material-ui/react-popover/) components.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 *
 * - [Popover](https://mui.com/material-ui/react-popover/)
 * - [Transitions](https://mui.com/material-ui/transitions/)
 *
 * API:
 *
 * - [Grow API](https://mui.com/material-ui/api/grow/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition/#Transition-props)
 */
export default function Grow(props: GrowProps): React.JSX.Element;
