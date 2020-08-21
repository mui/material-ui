import * as React from 'react';
import { StandardProps } from '..';

export type StepConnectorIcon = React.ReactElement | string | number;

export interface StepConnectorProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepConnectorClasskey, 'children'> {
  /**
   * See [CSS API](#css) below for more details.
   */
  classes?: {};
}

export type StepConnectorClasskey =
  | 'root'
  | 'horizontal'
  | 'vertical'
  | 'alternativeLabel'
  | 'active'
  | 'completed'
  | 'disabled'
  | 'line'
  | 'lineHorizontal'
  | 'lineVertical';

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
