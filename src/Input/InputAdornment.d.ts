import * as React from 'react';
import { StandardProps } from '..';

export interface InputAdornmentProps extends StandardProps<{}, InputAdornmentClassKey> {
  component?: string | React.ComponentType<InputAdornmentProps>;
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
