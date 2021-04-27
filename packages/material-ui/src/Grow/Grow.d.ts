import * as React from 'react';
import { Omit } from '@material-ui/types';
import { Theme } from '../styles/createTheme';
import { TransitionProps } from '../transitions/transition';

export interface GrowProps extends Omit<TransitionProps, 'timeout'> {
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
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in?: boolean;
  ref?: React.Ref<unknown>;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout?: TransitionProps['timeout'] | 'auto';
}

/**
 * The Grow transition is used by the [Tooltip](https://material-ui.com/components/tooltips/) and
 * [Popover](https://material-ui.com/components/popover/) components.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Popover](https://material-ui.com/components/popover/)
 * - [Transitions](https://material-ui.com/components/transitions/)
 *
 * API:
 *
 * - [Grow API](https://material-ui.com/api/grow/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */
export default function Grow(props: GrowProps): JSX.Element;
