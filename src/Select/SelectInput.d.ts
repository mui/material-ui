import * as React from 'react';
import { StyledComponent } from '..';

export interface SelectInputProps {
  disabled?: boolean,
  native: boolean,
  multiple: boolean,
  MenuProps?: Object,
  name?: string,
  onBlur?: React.FocusEventHandler<any>;
  onChange?: (event: React.ChangeEvent<{}>, child: React.ReactNode) => void,
  onFocus?: React.FocusEventHandler<any>;
  readOnly?: boolean,
  renderValue?: Function,
  selectRef?: Function,
  value?: string | number | Array<string | number>,
}

export default class SelectInput extends StyledComponent<SelectInputProps> {}
