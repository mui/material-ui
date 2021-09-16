import * as React from 'react';
import { Theme } from '../styles/createTheme';
import { TransitionProps } from '../transitions/transition';

export interface ZoomProps extends TransitionProps {
  /**
   * A single child content element.
   */
  children?: React.ReactElement<any, any>;
  /**
   * Enable this prop if you encounter 'Function components cannot be given refs',
   * use `unstable_createStrictModeTheme`,
   * and can't forward the ref in the child component.
   */
  disableStrictModeCompat?: boolean;
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean;
  ref?: React.Ref<unknown>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout?: TransitionProps['timeout'];
}

/**
 * The Zoom transition can be used for the floating variant of the
 * [Button](https://mui.com/components/buttons/#floating-action-buttons) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Transitions](https://mui.com/components/transitions/)
 *
 * API:
 *
 * - [Zoom API](https://mui.com/api/zoom/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */
export default function Zoom(props: ZoomProps): JSX.Element;
