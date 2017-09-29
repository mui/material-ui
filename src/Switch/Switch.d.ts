import * as React from 'react';
import { StyledComponent } from '..';
import { SwitchBaseProps } from '../internal/SwitchBase';

export interface SwitchProps extends SwitchBaseProps {
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
  | 'root'
  | 'bar'
  | 'icon'
  | 'default'
  | 'checked'
  | 'disabled'
  ;

declare const Switch: StyledComponent<SwitchProps, SwitchClassKey>;

export default Switch;
