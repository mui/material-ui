import * as React from 'react';
import { StandardProps } from '..';
import { MenuProps } from '../Menu';

export interface SelectInputProps extends StandardProps<{}, SelectInputClassKey> {
  autoFocus?: boolean;
  autoWidth: boolean;
  disabled?: boolean;
  IconComponent?: React.ReactType;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: SelectInputProps['value'] },
  ) => void;
  MenuProps?: Partial<MenuProps>;
  multiple: boolean;
  name?: string;
  native: boolean;
  onBlur?: React.FocusEventHandler<any>;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => void;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onFocus?: React.FocusEventHandler<any>;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  readOnly?: boolean;
  renderValue?: (value: SelectInputProps['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  tabIndex?: number;
  value?: string | number | Array<string | number>;
}

export type SelectInputClassKey = 'root' | 'select' | 'selectMenu' | 'disabled' | 'icon';

declare const SelectInput: React.ComponentType<SelectInputProps>;

export default SelectInput;
