import * as React from 'react';
import { StandardProps } from '..';

export interface InputAdornmentProps extends StandardProps<{}, InputAdornmentClassKey> {
  component?: React.ReactType;
  disableTypography?: boolean;
  position: 'start' | 'end';
}

export type InputAdornmentClassKey =
  | 'root'
  | 'positionStart'
  | 'positionEnd'
  ;

declare const InputAdornment: React.ComponentType<InputAdornmentProps>;

export default InputAdornment;
