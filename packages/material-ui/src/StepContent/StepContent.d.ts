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
 *
 * Demos:
 * - {@link https://material-ui.com/components/steppers Steppers}
 *
 * API:
 * - {@link https://material-ui.com/api/StepContent StepContent API}
 *
 */
declare const StepContent: React.ComponentType<StepContentProps>;

export default StepContent;
