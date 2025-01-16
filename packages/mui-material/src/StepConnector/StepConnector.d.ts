import type * as React from 'react';
import type { SxProps } from '@mui/system';
import type { InternalStandardProps as StandardProps } from '..';
import type { Theme } from '../styles';
import type { StepConnectorClasses } from './stepConnectorClasses';

export type StepConnectorIcon = React.ReactElement<unknown> | string | number;

export interface StepConnectorProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepConnectorClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type StepConnectorClasskey = keyof NonNullable<StepConnectorProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepConnector API](https://mui.com/material-ui/api/step-connector/)
 */
export default function StepConnector(props: StepConnectorProps): React.JSX.Element;
