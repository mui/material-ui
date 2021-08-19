import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { PaperProps } from '../Paper';
import { LinearProgressProps } from '../LinearProgress';
import { MobileStepperClasses } from './mobileStepperClasses';

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
  classes?: Partial<MobileStepperClasses>;
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The variant to use.
   * @default 'dots'
   */
  variant?: 'text' | 'dots' | 'progress';
}

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
