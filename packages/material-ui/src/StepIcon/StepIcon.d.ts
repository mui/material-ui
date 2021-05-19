import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { InternalStandardProps as StandardProps } from '..';
import { Theme } from '../styles';

export interface StepIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Whether this step is active.
   * @default false
   */
  active?: boolean;
  /**
   * Override or extend the styles applied to the component.
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
   * @default false
   */
  completed?: boolean;
  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error?: boolean;
  /**
   * The label displayed in the step icon.
   */
  icon: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type StepIconClasskey = keyof NonNullable<StepIconProps['classes']>;

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
