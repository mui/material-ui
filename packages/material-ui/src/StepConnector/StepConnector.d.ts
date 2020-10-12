import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export type StepConnectorIcon = React.ReactElement | string | number;

export interface StepConnectorProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    root?: string;
    horizontal?: string;
    vertical?: string;
    alternativeLabel?: string;
    active?: string;
    completed?: string;
    disabled?: string;
    line?: string;
    lineHorizontal?: string;
    lineVertical?: string;
  };
}

export type StepConnectorClasskey = keyof NonNullable<StepConnectorProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepConnector API](https://material-ui.com/api/step-connector/)
 */
export default function StepConnector(props: StepConnectorProps): JSX.Element;
