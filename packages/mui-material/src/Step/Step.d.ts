import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { StepClasses } from './stepClasses';

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
  classes?: Partial<StepClasses>;
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean;
  /**
   * If `true`, the step is disabled, will also disable the button if
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
   * If `true`, the Step is displayed as rendered last.
   * The prop defaults to the value inherited from the parent Stepper component.
   */
  last?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type StepClasskey = keyof NonNullable<StepProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [Step API](https://mui.com/material-ui/api/step/)
 */
export default function Step(props: StepProps): JSX.Element;
