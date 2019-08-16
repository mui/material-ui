import * as React from 'react';
import { StandardProps } from '..';
import { InputProps } from '../Input';
import { MenuProps } from '../Menu';
import { SelectInputProps } from './SelectInput';

export interface SelectProps<V = unknown, M = boolean>
  extends StandardProps<InputProps<V>, SelectClassKey, 'value' | 'onChange'>,
    Pick<SelectInputProps<V, M>, 'onChange'> {
  autoWidth?: boolean;
  displayEmpty?: boolean;
  IconComponent?: React.ElementType;
  input?: React.ReactNode;
  MenuProps?: Partial<MenuProps>;
  multiple?: M;
  native?: boolean;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  renderValue?: (value: SelectInputProps<V, M>['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  value?: SelectInputProps<V, M>['value'];
  variant?: 'standard' | 'outlined' | 'filled';
}

export type SelectClassKey =
  | 'root'
  | 'select'
  | 'selectMenu'
  | 'disabled'
  | 'icon'
  | 'filled'
  | 'outlined';

/* tslint:disable:unified-signatures */
declare function Select<V>(props: { multiple: true } & SelectProps<V, true>): JSX.Element;
declare function Select<V>(props: ({ multiple: false } | { multiple?: undefined }) & SelectProps<V, false>): JSX.Element;

export default Select;
