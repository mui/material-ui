import * as React from 'react';
import { StandardProps } from '..';

export interface StepIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepIconClasskey> {
  active?: boolean;
  completed?: boolean;
  icon: React.ReactNode;
}

export type StepIconClasskey = 'root' | 'completed';

declare const StepIcon: React.ComponentType<StepIconProps>;

export default StepIcon;
