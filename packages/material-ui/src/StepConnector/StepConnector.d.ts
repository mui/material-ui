import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from '../Stepper';

export type StepConnectorIcon = React.ReactElement<any> | string | number;

export interface StepConnectorProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepConnectorClasskey> {
  alternativeLabel?: boolean;
  orientation?: Orientation;
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
}

export type StepConnectorClasskey =
  | 'root'
  | 'horizontal'
  | 'vertical'
  | 'alternativeLabel'
  | 'line'
  | 'lineHorizontal'
  | 'lineVertical'
  | 'lineActive'
  | 'lineCompleted'
  | 'lineDisabled';

declare const StepConnector: React.ComponentType<StepConnectorProps>;

export default StepConnector;
