import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface StepIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Whether this step is active.
   * @default false
   */
  active?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    text?: string;
    active?: string;
    completed?: string;
    error?: string;
  };
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed?: boolean;
  /**
   * Mark the step as failed.
   * @default false
   */
  error?: boolean;
  /**
   * The label displayed in the step icon.
   */
  icon: React.ReactNode;
}

export type StepIconClasskey = keyof NonNullable<StepIconProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepIcon API](https://material-ui.com/api/step-icon/)
 */
export default function StepIcon(props: StepIconProps): JSX.Element;
