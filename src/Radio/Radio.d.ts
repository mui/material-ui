import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface RadioProps extends StandardProps<
  SwitchBaseProps,
  RadioClassKey
> {
  checked?: boolean | string;
  checkedClassName?: string;
  checkedIcon?: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  disabledClassName?: string;
  disableRipple?: boolean;
  icon?: React.ReactNode;
  inputProps?: Object;
  inputRef?: React.Ref<any>;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  tabIndex?: number;
  value?: string;
}

export type RadioClassKey =
  | SwitchBaseClassKey
  ;

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
