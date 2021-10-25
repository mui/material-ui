import * as React from 'react';
import StandardProps from '../InternalStandardProps';

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
