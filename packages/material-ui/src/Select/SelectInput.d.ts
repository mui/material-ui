import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '..';
import { MenuProps } from '../Menu';

/**
 * The change can be caused by different kind of events.
 * The type of event depends on what caused the change.
 * For example, when the browser auto-fills the `Select` you'll receive a `React.ChangeEvent`.
 */
export type SelectChangeEvent<T = string> =
  | (Event & { target: { value: T; name: string } })
  | React.ChangeEvent<HTMLInputElement>;

export interface SelectInputProps<T = unknown> {
  autoFocus?: boolean;
  autoWidth: boolean;
  disabled?: boolean;
  IconComponent?: React.ElementType;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: SelectInputProps<T>['value'] },
  ) => void;
  MenuProps?: Partial<MenuProps>;
  multiple: boolean;
  name?: string;
  native: boolean;
  onBlur?: React.FocusEventHandler<any>;
  onChange?: (event: SelectChangeEvent<T>, child: React.ReactNode) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  onFocus?: React.FocusEventHandler<any>;
  onOpen?: (event: React.SyntheticEvent) => void;
  open?: boolean;
  readOnly?: boolean;
  renderValue?: (value: SelectInputProps<T>['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  sx?: SxProps<Theme>;
  tabIndex?: number;
  value?: T;
  variant?: 'standard' | 'outlined' | 'filled';
}

declare const SelectInput: React.JSXElementConstructor<SelectInputProps>;

export default SelectInput;
