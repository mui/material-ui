import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { ButtonProps } from '../Button';

export interface MobileStepperProps<C = {}>
  extends StandardProps<PaperProps<C>, MobileStepperClassKey> {
  activeStep?: number;
  backButton: React.ReactElement<any>;
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

declare class MobileStepper<C> extends React.Component<C & MobileStepperProps<C>> {}

export default MobileStepper;
