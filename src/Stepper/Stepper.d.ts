import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';
import { PaperClassKey } from '../Paper/Paper';

export type Orientation = 'horizontal' | 'vertical';

export interface StepperProps extends StandardProps<PaperProps, StepperClasskey> {
  activeStep?: number;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  connector?: React.ReactElement<any> | React.ReactNode;
  nonLinear?: boolean;
  orientation?: Orientation;
}

export type StepperClasskey = PaperClassKey | 'root' | 'horizontal' | 'vertical';

declare const Stepper: React.ComponentType<StepperProps>;

export default Stepper;
