import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { PaperProps } from '../Paper';

export type Orientation = 'horizontal' | 'vertical';

export interface StepperProps extends StandardProps<PaperProps> {
  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   */
  activeStep?: number;
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel?: boolean;
  /**
   * Two or more `<Step />` components.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    horizontal?: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical?: string;
    /** Styles applied to the root element if `alternativeLabel={true}`. */
    alternativeLabel?: string;
  };
  /**
   * An element to be placed between each step.
   */
  connector?: React.ReactElement<any, any>;
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear?: boolean;
  /**
   * The stepper orientation (layout flow direction).
   */
  orientation?: Orientation;
}

export type StepperClasskey = keyof NonNullable<StepperProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [Stepper API](https://material-ui.com/api/stepper/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function Stepper(props: StepperProps): JSX.Element;
