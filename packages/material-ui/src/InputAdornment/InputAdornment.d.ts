import * as React from 'react';
import { StandardProps } from '..';

export interface InputAdornmentProps<C>
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, InputAdornmentClassKey> {
  component?: React.ReactType<C>;
  disableTypography?: boolean;
  position: 'start' | 'end';
}

export type InputAdornmentClassKey = 'root' | 'positionStart' | 'positionEnd';

declare class InputAdornment<C> extends React.Component<C & InputAdornmentProps<C>> {}

export default InputAdornment;
