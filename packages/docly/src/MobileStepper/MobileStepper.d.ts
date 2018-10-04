import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { ButtonProps } from '../Button';
import { LinearProgressProps } from '../LinearProgress';

export interface MobileStepperProps extends StandardProps<PaperProps, MobileStepperClassKey> {
  activeStep?: number;
  backButton: React.ReactElement<any>;
  LinearProgressProps?: Partial<LinearProgressProps>;
  nextButton: React.ReactElement<any>;
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

declare const MobileStepper: React.ComponentType<MobileStepperProps>;

export default MobileStepper;
