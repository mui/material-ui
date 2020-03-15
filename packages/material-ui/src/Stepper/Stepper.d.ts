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
 *
 * Demos:
 * - {@link https://material-ui.com/components/steppers/ Steppers}
 *
 * API:
 * - {@link https://material-ui.com/api/stepper/ Stepper API}
 * - inherits {@link https://material-ui.com/api/paper/ Paper API}
 */
declare const Stepper: React.ComponentType<StepperProps>;

export default Stepper;
