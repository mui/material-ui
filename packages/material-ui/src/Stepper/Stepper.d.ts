import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export type Orientation = 'horizontal' | 'vertical';

export interface StepperProps extends StandardProps<PaperProps, StepperClasskey> {
  activeStep?: number;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  connector?: React.ReactElement | React.ReactNode;
  nonLinear?: boolean;
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
declare const Stepper: React.ComponentType<StepperProps>;

export default Stepper;
