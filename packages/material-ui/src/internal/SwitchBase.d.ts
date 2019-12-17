import * as React from 'react';
import { StandardProps } from '..';
import { IconButtonProps } from '../IconButton';

export interface SwitchBaseProps
  extends StandardProps<IconButtonProps, SwitchBaseClassKey, 'onChange' | 'value'> {
  autoFocus?: boolean;
  checked?: boolean;
  checkedIcon: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  disableRipple?: boolean;
  icon: React.ReactNode;
  inputProps?: SwitchBaseComponentProps;
  inputRef?: React.Ref<any>;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  readOnly?: boolean;
  required?: boolean;
  tabIndex?: number;
  value?: unknown;
}

export interface SwitchBaseComponentProps extends React.HTMLAttributes<HTMLInputElement> {
  // Accommodate arbitrary additional props coming from the `inputProps` prop
  [arbitrary: string]: any;
}

export type SwitchBaseClassKey = 'root' | 'checked' | 'disabled' | 'input';

declare const SwitchBase: React.ComponentType<SwitchBaseProps>;

export default SwitchBase;
