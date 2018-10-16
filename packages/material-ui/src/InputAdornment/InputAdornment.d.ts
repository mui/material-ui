import * as React from 'react';
import { StandardProps } from '..';

export interface InputAdornmentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, InputAdornmentClassKey> {
  component?: React.ReactType<InputAdornmentProps>;
  disableTypography?: boolean;
  position: 'start' | 'end';
  variant?: 'standard' | 'outlined' | 'filled';
}

export type InputAdornmentClassKey = 'root' | 'positionStart' | 'positionEnd' | 'filled';

declare const InputAdornment: React.ComponentType<InputAdornmentProps>;

export default InputAdornment;
