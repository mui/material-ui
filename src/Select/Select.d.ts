import * as React from 'react';
import { StandardProps } from '..';
import { InputProps } from '../Input';
import { MenuProps } from '../Menu';

export interface SelectProps extends StandardProps<
  InputProps,
  SelectClassKey,
  'value'
> {
  autoWidth?: boolean;
  displayEmpty?: boolean;
  input?: React.ReactNode;
  MenuProps?: Partial<MenuProps>;
  multiple?: boolean;
  native?: boolean;
  renderValue?: Function;
  value?: Array<string | number> | string | number;
}

export type SelectClassKey =
  | 'root'
  | 'select'
  | 'selectMenu'
  | 'disabled'
  | 'icon'
  ;

declare const Select: React.ComponentType<SelectProps>;

export default Select;
