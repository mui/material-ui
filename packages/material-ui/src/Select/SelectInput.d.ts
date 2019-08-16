import * as React from 'react';
import { MenuProps } from '../Menu';

export interface SelectInputProps<V = unknown, M = boolean> {
  autoFocus?: boolean;
  autoWidth: boolean;
  disabled?: boolean;
  IconComponent?: React.ElementType;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: SelectInputProps<V, M>['value'] },
  ) => void;
  MenuProps?: Partial<MenuProps>;
  multiple: M;
  name?: string;
  native: boolean;
  onBlur?: React.FocusEventHandler<any>;
  onChange?: (
    event: React.ChangeEvent<{ name?: string; value: M extends true ? V[] : (V | undefined) }>,
    child: React.ReactNode,
  ) => void;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onFocus?: React.FocusEventHandler<any>;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  readOnly?: boolean;
  renderValue?: (value: SelectInputProps<V, M>['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  tabIndex?: number;
  value: M extends true ? V[] : V;
  variant?: 'standard' | 'outlined' | 'filled';
}

/* tslint:disable:unified-signatures */
declare function SelectInput<V>(props: { multiple: true } & SelectInputProps<V, true>): JSX.Element;
declare function SelectInput<V>(props: ({ multiple: false } | { multiple?: undefined }) & SelectInputProps<V, false>): JSX.Element;

export default SelectInput;
