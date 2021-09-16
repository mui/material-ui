import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from '../Stepper';

export interface StepProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepClasskey> {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active?: boolean;
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
   */
  children?: React.ReactNode;
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean;
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled?: boolean;
  /**
   * Expand the step.
   */
  expanded?: boolean;
}

export type StepClasskey = 'root' | 'horizontal' | 'vertical' | 'alternativeLabel' | 'completed';

/**
 *
 * Demos:
 *
 * - [Steppers](https://mui.com/components/steppers/)
 *
 * API:
 *
 * - [Step API](https://mui.com/api/step/)
 */
export default function Step(props: StepProps): JSX.Element;
