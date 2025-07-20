import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { MenuProps } from '../Menu';

/**
 * The change can be caused by different kind of events.
 * The type of event depends on what caused the change.
 * For example, when the browser auto-fills the `Select` you'll receive a `React.ChangeEvent`.
 */

export type SelectChangeEvent<Value = string> = Value extends (string & {}) | number
  ?
      | React.ChangeEvent<Omit<HTMLInputElement, 'value'> & { value: Value }>
      | (Event & { target: { value: Value; name: string } })
  : React.ChangeEvent<HTMLInputElement> | (Event & { target: { value: Value; name: string } });

export interface SelectInputProps<Value = unknown> {
  autoFocus?: boolean;
  autoWidth: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  error?: boolean;
  IconComponent?: React.ElementType;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: SelectInputProps<Value>['value'] },
  ) => void;
  MenuProps?: Partial<MenuProps>;
  multiple: boolean;
  name?: string;
  native: boolean;
  onBlur?: React.FocusEventHandler<any>;
  onChange?: (event: SelectChangeEvent<Value>, child: React.ReactNode) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  onFocus?: React.FocusEventHandler<any>;
  onOpen?: (event: React.SyntheticEvent) => void;
  open?: boolean;
  readOnly?: boolean;
  renderValue?: (value: SelectInputProps<Value>['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  sx?: SxProps<Theme>;
  tabIndex?: number;
  value?: Value;
  variant?: 'standard' | 'outlined' | 'filled';
}

declare const SelectInput: React.JSXElementConstructor<SelectInputProps>;

export default SelectInput;
