import * as React from 'react';
import { StyledComponent } from '..';

export interface InputAdornmentProps {
  disableTypography?: boolean;
  position: 'start' | 'end';
}

export type InputAdornmentClassKey =
  | 'root'
  | 'start'
  | 'end'
  ;

declare const InputAdornment: StyledComponent<InputAdornmentProps, InputAdornmentClassKey>;

export default InputAdornment;
