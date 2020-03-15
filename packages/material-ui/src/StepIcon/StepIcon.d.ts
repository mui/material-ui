import * as React from 'react';
import { StandardProps } from '..';

export interface StepIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepIconClasskey> {
  active?: boolean;
  completed?: boolean;
  error?: boolean;
  icon: React.ReactNode;
}

export type StepIconClasskey = 'root' | 'text' | 'active' | 'completed' | 'error';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/steppers/ Steppers}
 *
 * API:
 * - {@link https://material-ui.com/api/StepIcon StepIcon API}
 *
 */
declare const StepIcon: React.ComponentType<StepIconProps>;

export default StepIcon;
