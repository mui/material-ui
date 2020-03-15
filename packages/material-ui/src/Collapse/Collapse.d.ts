import * as React from 'react';
import { StandardProps } from '..';
import { Theme } from '../styles/createMuiTheme';
import { TransitionProps } from '../transitions/transition';

export interface CollapseProps extends StandardProps<TransitionProps, CollapseClassKey, 'timeout'> {
  children?: React.ReactNode;
  collapsedHeight?: string | number;
  component?: React.ElementType<TransitionProps>;
  theme?: Theme;
  timeout?: TransitionProps['timeout'] | 'auto';
}

export type CollapseClassKey = 'container' | 'entered' | 'hidden' | 'wrapper' | 'wrapperInner';

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](/components/steppers/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * Demos:
 * - {@link https://material-ui.com/components/cards/ Cards}
 * - {@link https://material-ui.com/components/lists/ Lists}
 * - {@link https://material-ui.com/components/transitions/ Transitions}
 *
 * API:
 * - {@link https://material-ui.com/api/collapse/ Collapse API}
 * - inherits {@link https://reactcommunity.org/react-transition-group/transition#Transition-props Transition API}
 */
declare const Collapse: React.ComponentType<CollapseProps>;

export default Collapse;
