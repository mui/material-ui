import * as React from 'react';
import { StyledComponent } from '..';

export interface SwitchBaseProps {
  checked?: boolean | string;
  checkedClassName?: string;
  checkedIcon?: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  disabledClassName?: string;
  disableRipple?: boolean;
  icon?: React.ReactNode;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<any>;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
  tabIndex?: number;
  value?: string;
}

export type SwitchBaseClassKey =
  | 'root'
  | 'default'
  | 'checked'
  | 'disabled'
  | 'input'
  ;

export type SwitchBase = StyledComponent<SwitchBaseProps, SwitchBaseClassKey>

export interface CreateSwitchBaseOptions {
  defaultIcon?: React.ReactNode;
  defaultCheckedIcon?: React.ReactNode;
  inputType?: string;
}

export default function createSwitch(
  options: CreateSwitchBaseOptions
): SwitchBase;
