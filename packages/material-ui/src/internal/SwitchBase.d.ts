import * as React from 'react';
import { StandardProps } from '..';
import { IconButtonProps } from '../IconButton';

export interface SwitchBaseProps<V = unknown>
  extends StandardProps<IconButtonProps, SwitchBaseClassKey, 'onChange' | 'value'> {
  autoFocus?: boolean;
  checked?: boolean;
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
  value?: V;
}

export type SwitchBaseClassKey = 'root' | 'checked' | 'disabled' | 'input';

export default function SwitchBase<V>(props: SwitchBaseProps<V>): JSX.Element;
