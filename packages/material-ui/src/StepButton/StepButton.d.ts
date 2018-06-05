import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from '../Stepper';
import { ButtonBaseProps } from '../ButtonBase';

export type StepButtonIcon = React.ReactElement<any> | string | number | null;

export interface StepButtonProps<C> extends StandardProps<ButtonBaseProps<C>, StepButtonClasskey> {
  active?: boolean;
  alternativeLabel?: boolean;
  completed?: boolean;
  disabled?: boolean;
  icon?: StepButtonIcon;
  last?: boolean;
  optional?: React.ReactNode;
  orientation?: Orientation;
}

export type StepButtonClasskey = 'root' | 'vertical' | 'touchRipple';

declare class StepButton<C> extends React.Component<C & StepButtonProps<C>> {}

export default StepButton;
