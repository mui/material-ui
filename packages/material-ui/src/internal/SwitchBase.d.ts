import * as React from 'react';
import { StandardProps } from '..';
import { IconButtonProps } from '../IconButton';

export interface SwitchBaseProps
  extends StandardProps<IconButtonProps, SwitchBaseClassKey, 'onChange'> {
  autoFocus?: boolean;
  checked?: boolean | string;
  checkedIcon: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  disableRipple?: boolean;
  icon: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<any>;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  readOnly?: boolean;
  required?: boolean;
  tabIndex?: number;
  value?: string;
}

export type SwitchBaseClassKey = 'root' | 'checked' | 'disabled' | 'input';

export type SwitchBase = React.Component<SwitchBaseProps>;

export interface CreateSwitchBaseOptions {
  defaultIcon?: React.ReactNode;
  defaultCheckedIcon?: React.ReactNode;
  type?: string;
}

export default function createSwitch(options: CreateSwitchBaseOptions): SwitchBase;
