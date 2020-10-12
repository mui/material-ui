import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { PaperProps } from '../Paper';
import { LinearProgressProps } from '../LinearProgress';

export interface MobileStepperProps extends StandardProps<PaperProps, 'children' | 'variant'> {
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   * @default 0
   */
  activeStep?: number;
  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    positionBottom?: string;
    positionTop?: string;
    positionStatic?: string;
    dots?: string;
    dot?: string;
    dotActive?: string;
    progress?: string;
  };
  /**
   * Props applied to the `LinearProgress` element.
   */
  LinearProgressProps?: Partial<LinearProgressProps>;
  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: React.ReactNode;
  /**
   * Set the positioning type.
   * @default 'bottom'
   */
  position?: 'bottom' | 'top' | 'static';
  /**
   * The total steps.
   */
  steps: number;
  /**
   * The variant to use.
   * @default 'dots'
   */
  variant?: 'text' | 'dots' | 'progress';
}

export type MobileStepperClassKey = keyof NonNullable<MobileStepperProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [MobileStepper API](https://material-ui.com/api/mobile-stepper/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function MobileStepper(props: MobileStepperProps): JSX.Element;
