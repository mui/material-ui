import * as React from 'react';
import { MenuProps } from '../Menu';

export interface SelectInputProps<T> {
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
  onChange?: (
    event: React.ChangeEvent<{ name?: string; value: T }>,
    child: React.ReactNode,
  ) => void;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onFocus?: React.FocusEventHandler<any>;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  readOnly?: boolean;
  renderValue?: (value: SelectInputProps<T>['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  tabIndex?: number;
  value: T;
  variant?: 'standard' | 'outlined' | 'filled';
}

export default function SelectInput<T = unknown>(props: SelectInputProps<T>): JSX.Element;
