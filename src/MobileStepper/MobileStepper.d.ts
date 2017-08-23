import * as React from 'react';
import { StyledComponent } from '..';
import { PaperProps } from '../Paper';

export interface MobileStepperProps extends PaperProps {
  activeStep?: number;
  backButtonText?: React.ReactNode;
  disableBack?: boolean;
  disableNext?: boolean;
  nextButtonText?: React.ReactNode;
  onBack: React.EventHandler<any>;
  onNext: React.EventHandler<any>;
  position?: 'bottom' | 'top' | 'static';
  steps: number;
  type?: 'text' | 'dots' | 'progress';
}

export default class MobileStepper extends StyledComponent<
  MobileStepperProps
> {}
