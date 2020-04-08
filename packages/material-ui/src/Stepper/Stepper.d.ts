import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export type Orientation = 'horizontal' | 'vertical';

export interface StepperProps extends StandardProps<PaperProps, StepperClasskey> {
  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   */
  activeStep?: number;
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel?: boolean;
  /**
   * Two or more `<Step />` components.
   */
  children: React.ReactNode;
  /**
   * An element to be placed between each step.
   */
  connector?: React.ReactElement<any, any>;
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear?: boolean;
  /**
   * The stepper orientation (layout flow direction).
   */
  orientation?: Orientation;
}

export type StepperClasskey = 'root' | 'horizontal' | 'vertical' | 'alternativeLabel';

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [Stepper API](https://material-ui.com/api/stepper/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function Stepper(props: StepperProps): JSX.Element;
