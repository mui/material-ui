import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from './Stepper';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export type Icon = React.ReactElement<any> | string | number;

export interface StepButtonProps extends StandardProps<
  ButtonBaseProps,
  StepButtonClasskey
> {
  active?: boolean;
  alternativeLabel?: boolean;
  children: React.ReactElement<any>;
  completed?: boolean;
  disabled?: boolean;
  icon?: Icon;
  last?: boolean;
  optional?: boolean;
  orientation: Orientation;
}

export type StepButtonClasskey =
  | ButtonBaseClassKey
  | 'root'
  | 'alternativeLabel'
  ;

declare const StepButton: React.ComponentType<StepButtonProps>;

export default StepButton;
