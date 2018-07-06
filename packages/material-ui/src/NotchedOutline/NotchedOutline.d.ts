import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface NotchedOutlineProps
  extends StandardProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, NotchedOutlineClassKey> {
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  notched?: boolean;
  notchWidth: number;
  NotchProps?: React.HTMLAttributes<HTMLLegendElement>;
}

export type NotchedOutlineClassKey = 'root' | 'legend' | 'focused' | 'error' | 'disabled';

declare const NotchedOutline: React.ComponentType<NotchedOutlineProps>;

export default NotchedOutline;
