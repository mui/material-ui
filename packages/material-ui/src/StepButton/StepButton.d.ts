import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from '../Stepper';
import { ButtonBaseProps } from '../ButtonBase';

export type StepButtonIcon = React.ReactElement | string | number | null;

export interface StepButtonProps extends StandardProps<ButtonBaseProps, StepButtonClasskey> {
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

declare const StepButton: React.ComponentType<StepButtonProps>;

export default StepButton;
