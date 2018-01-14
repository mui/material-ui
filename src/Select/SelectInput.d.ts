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
  onChange?: (event: React.ChangeEvent<{}>, child: React.ReactNode) => void;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onFocus?: React.FocusEventHandler<any>;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  readOnly?: boolean;
  renderValue?: (value: SelectInputProps['value']) => React.ReactNode;
  selectRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: SelectInputProps['value'] },
  ) => void;
  value?: string | number | Array<string | number>;
}

export type SelectInputClassKey = 'root' | 'select' | 'selectMenu' | 'disabled' | 'icon';

declare const SelectInput: React.ComponentType<SelectInputProps>;

export default SelectInput;
