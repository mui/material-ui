import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { PaperProps } from '../Paper';
import { LinearProgressProps } from '../LinearProgress';

export interface MobileStepperProps extends StandardProps<PaperProps, 'children' | 'variant'> {
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
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
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `position="bottom"`. */
    positionBottom?: string;
    /** Styles applied to the root element if `position="top"`. */
    positionTop?: string;
    /** Styles applied to the root element if `position="static"`. */
    positionStatic?: string;
    /** Styles applied to the dots container if `variant="dots"`. */
    dots?: string;
    /** Styles applied to each dot if `variant="dots"`. */
    dot?: string;
    /** Styles applied to a dot if `variant="dots"` and this is the active step. */
    dotActive?: string;
    /** Styles applied to the Linear Progress component if `variant="progress"`. */
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
   */
  position?: 'bottom' | 'top' | 'static';
  /**
   * The total steps.
   */
  steps: number;
  /**
   * The variant to use.
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
