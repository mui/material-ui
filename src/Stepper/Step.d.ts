import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from './Stepper';

export interface StepProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  StepClasskey
> {
  active?: boolean;
  alternativeLabel?: boolean;
  children?: React.ReactNode;
  completed?: boolean;
  connector?: React.ReactElement<any>;
  disabled?: boolean;
  index?: number;
  last?: boolean;
  orientation?: Orientation;
}

export type StepClasskey =
  | 'root'
  | 'horizontal'
  | 'alternativeLabel'
  ;

declare const Step: React.ComponentType<StepProps>;

export default Step;
