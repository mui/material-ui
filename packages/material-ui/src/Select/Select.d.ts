import * as React from 'react';
import { StandardProps } from '..';
import { InputProps } from '../Input';
import { MenuProps } from '../Menu';
import { SelectInputProps } from './SelectInput';

export interface SelectProps<C = {}>
  extends StandardProps<InputProps, SelectClassKey, 'value' | 'onChange'>,
    Pick<SelectInputProps<C>, 'onChange'> {
  autoWidth?: boolean;
  displayEmpty?: boolean;
  IconComponent?: React.ReactType;
  input?: React.ReactNode;
  MenuProps?: Partial<C & MenuProps<C>>;
  multiple?: boolean;
  native?: boolean;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  renderValue?: (value: C & SelectProps<C>['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  value?: Array<string | number> | string | number;
}

export type SelectClassKey = 'root' | 'select' | 'selectMenu' | 'disabled' | 'icon';

declare class Select<C> extends React.Component<SelectProps<C>> {}

export default Select;
