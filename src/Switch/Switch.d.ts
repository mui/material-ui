import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface SwitchProps extends StandardProps<
  SwitchBaseProps,
  SwitchClassKey
> {
  checked?: boolean | string;
  checkedClassName?: string;
  checkedIcon?: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  disabledClassName?: string;
  disableRipple?: boolean;
  icon?: React.ReactNode;
  inputProps?: object;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
  tabIndex?: number;
  value?: string;
}

export type SwitchClassKey =
  | SwitchBaseClassKey
  | 'bar'
  | 'icon'
  ;

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
