import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { TransitionProps } from '../transitions/transition';

export interface CollapseProps extends StandardProps<TransitionProps, 'timeout'> {
  /**
   * The content node to be collapsed.
   */
  children?: React.ReactNode;
  className?: string;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Pseudo-class applied to the root element if `orientation="horizontal"`. */
    horizontal?: string;
    /** Styles applied to the root element when the transition has entered. */
    entered?: string;
    /** Styles applied to the root element when the transition has exited and `collapsedSize` != 0px. */
    hidden?: string;
    /** Styles applied to the outer wrapper element. */
    wrapper?: string;
    /** Styles applied to the inner wrapper element. */
    wrapperInner?: string;
  };
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
   * If `true`, the component will transition in.
   */
  in?: boolean;
  /**
   * The collapse transition orientation.
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
}

export type CollapseClassKey = keyof NonNullable<CollapseProps['classes']>;

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
