import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from './Stepper';
import { StepButtonIcon } from './StepButton';

export interface StepLabelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepLabelClasskey> {
  active?: boolean;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  completed?: boolean;
  disabled?: boolean;
  icon?: StepButtonIcon;
  last?: boolean;
  optional?: React.ReactNode;
  orientation?: Orientation;
}

export type StepLabelClasskey =
  | 'root'
  | 'horizontal'
  | 'vertical'
  | 'active'
  | 'completed'
  | 'disabled'
  | 'iconContainer'
  | 'iconContainerNoAlternative'
  | 'alternativeLabelRoot'
  | 'alternativeLabel';

declare const StepLabel: React.ComponentType<StepLabelProps>;

export default StepLabel;
