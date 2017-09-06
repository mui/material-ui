import * as React from 'react';
import { StyledComponent } from '..';

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  input: React.ReactNode;
  native?: boolean;
  multiple?: boolean;
  MenuProps?: Object;
  renderValue?: Function;
  value?: Array<string | number> | string | number;
};

export default class Select extends StyledComponent<SelectProps> {}
