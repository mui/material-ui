import * as React from 'react';
import { StandardProps } from '..';
import { MenuProps } from '../Menu';

export interface SelectInputProps extends StandardProps<{}, SelectInputClassKey> {
  autoWidth: boolean;
  disabled?: boolean;
  MenuProps?: Partial<MenuProps>;
  multiple: boolean;
  name?: string;
  native: boolean;
  onBlur?: React.FocusEventHandler<any>;
  onChange?: (event: React.ChangeEvent<{}>, child: React.ReactNode) => void,
  onFocus?: React.FocusEventHandler<any>;
  readOnly?: boolean;
  renderValue?: Function;
  selectRef?: Function;
  value?: string | number | Array<string | number>;
}

export type SelectInputClassKey =
  | 'root'
  | 'select'
  | 'selectMenu'
  | 'disabled'
  | 'icon'
  ;

declare const SelectInput: React.ComponentType<SelectInputProps>;

export default SelectInput;
