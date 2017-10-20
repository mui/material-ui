import * as React from 'react';
import { StandardProps } from '..';
import { InputProps } from '../Input';
import { InputClassKey } from '../Input/Input';

export interface SelectProps extends StandardProps<
  InputProps,
  SelectClassKey,
  'value'
> {
  autoWidth?: boolean;
  displayEmpty?: boolean;
  input?: React.ReactNode;
  native?: boolean;
  multiple?: boolean;
  MenuProps?: Object;
  renderValue?: Function;
  value?: Array<string | number> | string | number;
}

type SelectClassKey =
  | InputClassKey
  | 'select'
  | 'selectMenu'
  | 'icon'
  ;

declare const Select: React.ComponentType<SelectProps>;

export default Select;
