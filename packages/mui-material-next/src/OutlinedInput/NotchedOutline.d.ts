import * as React from 'react';
// TODO v6: port to material-next
import { InternalStandardProps as StandardProps } from '@mui/material';

export interface NotchedOutlineProps
  extends StandardProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>> {
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  label?: React.ReactNode;
  notched: boolean;
}

export type NotchedOutlineClassKey = keyof NonNullable<NotchedOutlineProps['classes']>;

declare const NotchedOutline: React.JSXElementConstructor<NotchedOutlineProps>;

export default NotchedOutline;
