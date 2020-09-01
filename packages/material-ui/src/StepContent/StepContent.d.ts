import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { TransitionProps } from '../transitions/transition';

export interface StepContentProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * Step content.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `last={true}` (controlled by `Step`). */
    last?: string;
    /** Styles applied to the Transition component. */
    transition?: string;
  };
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent?: React.ComponentType<TransitionProps>;
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps?: TransitionProps;
}

export type StepContentClasskey = keyof NonNullable<StepContentProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepContent API](https://material-ui.com/api/step-content/)
 */
export default function StepContent(props: StepContentProps): JSX.Element;
