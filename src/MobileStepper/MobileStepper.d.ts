import * as React from 'react';
import { StyledComponent } from '..';
import { PaperProps } from '../Paper';
import { ButtonProps } from '../Button';

export interface MobileStepperProps extends PaperProps {
  activeStep?: number;
  backButton: React.ReactElement<any>;
  nextButton: React.ReactElement<any>;  
  position?: 'bottom' | 'top' | 'static';
  steps: number;
  type?: 'text' | 'dots' | 'progress';
}

export type MobileStepperClassKey =
  | 'root'
  | 'positionBottom'
  | 'positionTop'
  | 'positionStatic'
  | 'dots'
  | 'dot'
  | 'dotActive'
  | 'progress'
  ;

declare const MobileStepper: StyledComponent<MobileStepperProps, MobileStepperClassKey>;

export default MobileStepper;
