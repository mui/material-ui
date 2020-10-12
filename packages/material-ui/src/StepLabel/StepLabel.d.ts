import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { StepIconProps } from '../StepIcon';

export interface StepLabelProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    horizontal?: string;
    vertical?: string;
    label?: string;
    active?: string;
    completed?: string;
    error?: string;
    disabled?: string;
    iconContainer?: string;
    alternativeLabel?: string;
    labelContainer?: string;
  };
  /**
   * Mark the step as failed.
   * @default false
   */
  error?: boolean;
  /**
   * Override the default label of the step icon.
   */
  icon?: React.ReactNode;
  /**
   * The optional node to display.
   */
  optional?: React.ReactNode;
  /**
   * The component to render in place of the [`StepIcon`](/api/step-icon/).
   */
  StepIconComponent?: React.ElementType;
  /**
   * Props applied to the [`StepIcon`](/api/step-icon/) element.
   */
  StepIconProps?: Partial<StepIconProps>;
}

export type StepLabelClasskey = keyof NonNullable<StepLabelProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepLabel API](https://material-ui.com/api/step-label/)
 */
export default function StepLabel(props: StepLabelProps): JSX.Element;
