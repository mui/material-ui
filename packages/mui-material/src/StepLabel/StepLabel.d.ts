import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps } from '..';
import { StepIconProps } from '../StepIcon';
import { Theme } from '../styles';
import { StepLabelClasses } from './stepLabelClasses';

export interface StepLabelProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepLabelClasses>;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps?: {
    /**
     * Props applied to the label element.
     * @default {}
     */
    label?: React.HTMLProps<HTMLSpanElement>;
  };
  /**
   * If `true`, the step is marked as failed.
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
   * The component to render in place of the [`StepIcon`](/material-ui/api/step-icon/).
   */
  StepIconComponent?: React.ElementType;
  /**
   * Props applied to the [`StepIcon`](/material-ui/api/step-icon/) element.
   */
  StepIconProps?: Partial<StepIconProps>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type StepLabelClasskey = keyof NonNullable<StepLabelProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepLabel API](https://mui.com/material-ui/api/step-label/)
 */
declare const StepLabel: ((props: StepLabelProps) => JSX.Element) & { muiName: string };

export default StepLabel;
