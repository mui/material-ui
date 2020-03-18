import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { LinearProgressProps } from '../LinearProgress';

export interface MobileStepperProps
  extends StandardProps<PaperProps, MobileStepperClassKey, 'variant'> {
  activeStep?: number;
  backButton: React.ReactNode;
  LinearProgressProps?: Partial<LinearProgressProps>;
  nextButton: React.ReactNode;
  position?: 'bottom' | 'top' | 'static';
  steps: number;
  variant?: 'text' | 'dots' | 'progress';
}

export type MobileStepperClassKey =
  | 'root'
  | 'positionBottom'
  | 'positionTop'
  | 'positionStatic'
  | 'dots'
  | 'dot'
  | 'dotActive'
  | 'progress';

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [MobileStepper API](https://material-ui.com/api/mobile-stepper/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
declare const MobileStepper: React.ComponentType<MobileStepperProps>;

export default MobileStepper;
