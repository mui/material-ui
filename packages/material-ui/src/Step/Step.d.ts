import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface StepProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active?: boolean;
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
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
    /** Pseudo-class applied to the root element if `completed={true}`. */
    completed?: string;
  };
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean;
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled?: boolean;
  /**
   * Expand the step.
   * @default false
   */
  expanded?: boolean;
  /**
   * The position of the step.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  index?: number;
  /**
   * If `true`, the Step will be displayed as rendered last.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  last?: boolean;
}

export type StepClasskey = keyof NonNullable<StepProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [Step API](https://material-ui.com/api/step/)
 */
export default function Step(props: StepProps): JSX.Element;
