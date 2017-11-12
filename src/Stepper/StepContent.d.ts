import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from './Stepper';
import { TransitionDuration } from '../internal/transition';

export interface StepContentProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  StepContentClasskey
> {
  active?: boolean;
  alternativeLabel?: boolean;
  children: Node;
  completed?: boolean;
  last?: boolean;
  optional?: boolean;
  orientation?: Orientation;
  transition?: Function;
  transitionDuration: TransitionDuration;
}

export type StepContentClasskey =
  | 'root'
  | 'last'
  | 'transition'
  ;

declare const StepContent: React.ComponentType<StepContentProps>;

export default StepContent;
