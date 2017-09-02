import * as React from 'react';
import { StyledComponent } from '..';

export type SelectFieldInputProps = {
  className?: string;
  onBlur?: React.EventHandler<any>;
  onChange?: React.EventHandler<any>;
  onSelectBlur?: () => void;
  onSelectFocus?: () => void;
  options?: React.ReactElement<any>;
} & React.HTMLAttributes<HTMLDivElement>;

export default class SelectFieldInput extends StyledComponent<SelectFieldInputProps> {}
