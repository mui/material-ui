import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from '../Stepper';
import { TransitionProps } from '../transitions/transition';

export interface StepContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepContentClasskey> {
  /**
   * Step content.
   */
  children?: React.ReactNode;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: React.ComponentType<TransitionProps>;
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps;
}

export type StepContentClasskey = 'root' | 'last' | 'transition';

/**
 *
 * Demos:
 *
 * - [Steppers](https://mui.com/components/steppers/)
 *
 * API:
 *
 * - [StepContent API](https://mui.com/api/step-content/)
 */
export default function StepContent(props: StepContentProps): JSX.Element;
