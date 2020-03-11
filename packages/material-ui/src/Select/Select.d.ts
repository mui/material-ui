import * as React from 'react';
import { StandardProps } from '..';
import { InputProps } from '../Input';
import { MenuProps } from '../Menu';
import { SelectInputProps } from './SelectInput';

export interface SelectProps
  extends StandardProps<InputProps, SelectClassKey, 'value' | 'onChange'>,
    Pick<SelectInputProps, 'onChange'> {
  autoWidth?: boolean;
  displayEmpty?: boolean;
  IconComponent?: React.ElementType;
  input?: React.ReactNode;
  label?: React.ReactNode;
  labelId?: string;
  labelWidth?: number;
  MenuProps?: Partial<MenuProps>;
  multiple?: boolean;
  native?: boolean;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  renderValue?: (value: SelectProps['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  value?: unknown;
  variant?: 'standard' | 'outlined' | 'filled';
}

export type SelectClassKey =
  | 'root'
  | 'select'
  | 'filled'
  | 'outlined'
  | 'selectMenu'
  | 'disabled'
  | 'icon'
  | 'iconOpen'
  | 'iconFilled'
  | 'iconOutlined';

/**
 * 
 *
 * Demos:
 * - {@link https://material-ui.com/components/selects Selects}
 *
 * API:
 * - {@link https://material-ui.com/api/Select Select API}
 * - inherits {@link https://material-ui.com/api//api/input Input API}
 */
declare const Select: React.ComponentType<SelectProps>;

export default Select;
