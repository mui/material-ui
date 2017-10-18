import * as React from 'react';
import { StyledComponent } from '..';

export interface InputAdornmentProps {
  component?: React.ReactType;
  disableTypography?: boolean;
  position: 'start' | 'end';
}

export type InputAdornmentClassKey =
  | 'root'
  | 'positionStart'
  | 'positionEnd'
  ;

declare const InputAdornment: StyledComponent<InputAdornmentProps, InputAdornmentClassKey>;

export default InputAdornment;
