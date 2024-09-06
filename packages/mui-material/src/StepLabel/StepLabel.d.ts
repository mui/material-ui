import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps } from '..';
import { StepIconProps } from '../StepIcon';
import { Theme } from '../styles';
import { StepLabelClasses } from './stepLabelClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface StepLabelSlots {
  /**
   * The component that renders the label.
   * @default span
   */
  label: React.ElementType;
  /**
   * The component to render in place of the [`StepIcon`](https://mui.com/material-ui/api/step-icon/).
   */
  stepIcon: React.ElementType<StepIconProps>;
}

export type StepLabelSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StepLabelSlots,
  {
    label: SlotProps<React.ElementType<React.HTMLProps<HTMLSpanElement>>, {}, StepLabelOwnerState>;
    stepIcon: SlotProps<React.ElementType<StepIconProps>, {}, StepLabelOwnerState>;
  }
>;

export interface StepLabelOwnerState extends StepLabelProps {}

export interface StepLabelProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>>,
    StepLabelSlotsAndSlotProps {
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
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
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
   * The component to render in place of the [`StepIcon`](https://mui.com/material-ui/api/step-icon/).
   */
  StepIconComponent?: React.ElementType<StepIconProps>;
  /**
   * Props applied to the [`StepIcon`](https://mui.com/material-ui/api/step-icon/) element.
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
declare const StepLabel: ((props: StepLabelProps) => React.JSX.Element) & {
  muiName: string;
};

export default StepLabel;
