import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { TransitionProps } from '../transitions/transition';
import { CollapseClasses } from './collapseClasses';

export interface CollapseProps extends StandardProps<TransitionProps, 'timeout'> {
  /**
   * The content node to be collapsed.
   */
  children?: React.ReactNode;
  className?: string;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CollapseClasses>;
  /**
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize?: string | number;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<TransitionProps>;
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing?: TransitionProps['easing'];
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean;
  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout?: TransitionProps['timeout'] | 'auto';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](https://material-ui.com/components/steppers/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
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
