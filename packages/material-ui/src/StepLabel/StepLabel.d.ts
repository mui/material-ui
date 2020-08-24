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
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    horizontal?: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical?: string;
    /** Styles applied to the `Typography` component which wraps `children`. */
    label?: string;
    /** Pseudo-class applied to the `Typography` component if `active={true}`. */
    active?: string;
    /** Pseudo-class applied to the `Typography` component if `completed={true}`. */
    completed?: string;
    /** Pseudo-class applied to the root element and `Typography` component if `error={true}`. */
    error?: string;
    /** Pseudo-class applied to the root element and `Typography` component if `disabled={true}`. */
    disabled?: string;
    /** Styles applied to the `icon` container element. */
    iconContainer?: string;
    /** Pseudo-class applied to the root and icon container and `Typography` if `alternativeLabel={true}`. */
    alternativeLabel?: string;
    /** Styles applied to the container element which wraps `Typography` and `optional`. */
    labelContainer?: string;
  };
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
