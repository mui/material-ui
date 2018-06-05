import * as React from 'react';
import { MenuProps } from '../Menu';

export interface SelectInputProps<C> {
  autoFocus?: boolean;
  autoWidth: boolean;
  disabled?: boolean;
  IconComponent?: React.ReactType;
  inputRef?: (
    ref: HTMLSelectElement | { node: HTMLInputElement; value: C & SelectInputProps<C>['value'] },
  ) => void;
  MenuProps?: Partial<C & MenuProps<C>>;
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
  renderValue?: (value: C & SelectInputProps<C>['value']) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  tabIndex?: number;
  value?: string | number | Array<string | number>;
}

declare class SelectInput<C> extends React.Component<SelectInputProps<C>> {}

export default SelectInput;
