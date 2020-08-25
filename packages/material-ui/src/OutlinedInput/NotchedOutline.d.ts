import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export interface NotchedOutlineProps
  extends StandardProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>> {
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  labelWidth: number;
  notched: boolean;
}

export type NotchedOutlineClassKey = keyof NonNullable<NotchedOutlineProps['classes']>;

declare const NotchedOutline: React.ComponentType<NotchedOutlineProps>;

export default NotchedOutline;
