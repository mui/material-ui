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
 *
 * Demos:
 * - {@link https://material-ui.com/components/steppers/ Steppers}
 *
 * API:
 * - {@link https://material-ui.com/api/MobileStepper MobileStepper API}
 * - inherits {@link https://material-ui.com/api/paper/ Paper API}
 */
declare const MobileStepper: React.ComponentType<MobileStepperProps>;

export default MobileStepper;
