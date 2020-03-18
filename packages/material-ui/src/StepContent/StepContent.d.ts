import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from '../Stepper';
import { TransitionProps } from '../transitions/transition';

export interface StepContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepContentClasskey> {
  active?: boolean;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  completed?: boolean;
  last?: boolean;
  optional?: boolean;
  orientation?: Orientation;
  TransitionComponent?: React.ComponentType<TransitionProps>;
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  TransitionProps?: TransitionProps;
}

export type StepContentClasskey = 'root' | 'last' | 'transition';

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
declare const StepContent: React.ComponentType<StepContentProps>;

export default StepContent;
