import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface StepIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Whether this step is active.
   */
  active?: boolean;
  /**
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the SVG text element. */
    text?: string;
    /** Pseudo-class applied to the root element if `active={true}`. */
    active?: string;
    /** Pseudo-class applied to the root element if `completed={true}`. */
    completed?: string;
    /** Pseudo-class applied to the root element if `error={true}`. */
    error?: string;
  };
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean;
  /**
   * Mark the step as failed.
   */
  error?: boolean;
  /**
   * The label displayed in the step icon.
   */
  icon: React.ReactNode;
}

export type StepIconClasskey = 'root' | 'text' | 'active' | 'completed' | 'error';

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
