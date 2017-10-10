import * as React from 'react';
import { StyledComponent, Omit } from '..';
import { InputProps } from '../Input';

export type SelectProps = {
  autoWidth?: boolean;
  input?: React.ReactNode;
  native?: boolean;
  multiple?: boolean;
  MenuProps?: Object;
  renderValue?: Function;
  value?: Array<string | number> | string | number;
} & Omit<InputProps, 'value'>;

type SelectClassKey =
  | 'root'
  | 'select'
  | 'selectMenu'
  | 'disabled'
  | 'icon'
  ;

declare const Select: StyledComponent<SelectProps, SelectClassKey>;

export default Select;
