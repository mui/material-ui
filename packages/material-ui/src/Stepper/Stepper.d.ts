import * as React from 'react';
import { StandardProps } from '..';
import { PaperProps } from '../Paper';

export type Orientation = 'horizontal' | 'vertical';

export interface StepperProps<C> extends StandardProps<PaperProps<C>, StepperClasskey> {
  activeStep?: number;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  connector?: React.ReactElement<any> | React.ReactNode;
  nonLinear?: boolean;
  orientation?: Orientation;
}

export type StepperClasskey = 'root' | 'horizontal' | 'vertical' | 'alternativeLabel';

declare class Stepper<C> extends React.Component<C & StepperProps<C>> {}

export default Stepper;
