import * as React from 'react';
import { StandardProps } from '..';
import { IconButtonProps } from '../IconButton';

export interface SwitchBaseProps<C>
  extends StandardProps<IconButtonProps<C>, SwitchBaseClassKey, 'onChange'> {
  checked?: boolean | string;
  checkedIcon: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  disableRipple?: boolean;
  icon: React.ReactNode;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef?: React.Ref<any>;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  tabIndex?: number;
  value?: string;
}

export type SwitchBaseClassKey = 'root' | 'checked' | 'disabled' | 'input';

export type SwitchBase<C> = React.Component<C & SwitchBaseProps<C>>;

export interface CreateSwitchBaseOptions {
  defaultIcon?: React.ReactNode;
  defaultCheckedIcon?: React.ReactNode;
  type?: string;
}

export default function createSwitch<C>(options: CreateSwitchBaseOptions): SwitchBase<C>;
