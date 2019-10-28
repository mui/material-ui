import * as React from 'react';
import { MenuProps } from '../Menu';

export interface SelectInputProps {
  autoFocus?: boolean;
  autoWidth: boolean;
  disabled?: boolean;
  IconComponent?: React.ElementType;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: SelectInputProps['value'] },
  ) => void;
  MenuProps?: Partial<MenuProps>;
  multiple: boolean;
  name?: string;
  native: boolean;
  onBlur?: React.FocusEventHandler<any>;
  onChange?: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode,
  ) => void;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onFocus?: React.FocusEventHandler<any>;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  readOnly?: boolean;
  renderValue?: (value: SelectInputProps['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  tabIndex?: number;
  value?: unknown;
  variant?: 'standard' | 'outlined' | 'filled';
}

declare const SelectInput: React.ComponentType<SelectInputProps>;

export default SelectInput;
