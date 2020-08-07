import * as React from 'react';
import { StandardProps } from '..';
import { StepIconProps } from '../StepIcon';

export interface StepLabelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepLabelClasskey> {
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children?: React.ReactNode;
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepLabelButton` is a child of `StepLabel`. Is passed to child components.
   */
  disabled?: boolean;
  /**
   * Mark the step as failed.
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

export type StepLabelClasskey =
  | 'root'
  | 'horizontal'
  | 'vertical'
  | 'active'
  | 'completed'
  | 'alternativeLabel'
  | 'error'
  | 'disabled'
  | 'label'
  | 'iconContainer'
  | 'labelContainer';

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
