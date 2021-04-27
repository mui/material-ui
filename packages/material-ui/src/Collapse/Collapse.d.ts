import * as React from 'react';
import { StandardProps } from '..';
import { Theme } from '../styles/createTheme';
import { TransitionProps } from '../transitions/transition';

export interface CollapseProps extends StandardProps<TransitionProps, CollapseClassKey, 'timeout'> {
  /**
   * The content node to be collapsed.
   */
  children?: React.ReactNode;
  /**
   * The height of the container when collapsed.
   * @deprecated The prop was renamed to support the addition of horizontal orientation, use `collapsedSize` instead.
   */
  collapsedHeight?: string | number;
  /**
   * The height of the container when collapsed.
   */
  collapsedSize?: string | number;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<TransitionProps>;
  /**
   * Enable this prop if you encounter 'Function components cannot be given refs',
   * use `unstable_createStrictModeTheme`,
   * and can't forward the ref in the passed `Component`.
   */
  disableStrictModeCompat?: boolean;
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout?: TransitionProps['timeout'] | 'auto';
}

export type CollapseClassKey = 'root' | 'entered' | 'hidden' | 'wrapper' | 'wrapperInner';

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](https://material-ui.com/components/steppers/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 * - [Lists](https://material-ui.com/components/lists/)
 * - [Transitions](https://material-ui.com/components/transitions/)
 *
 * API:
 *
 * - [Collapse API](https://material-ui.com/api/collapse/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition#Transition-props)
 */

export default function Collapse(props: CollapseProps): JSX.Element;
