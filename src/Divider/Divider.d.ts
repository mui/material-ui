import * as React from 'react';
import { StandardProps } from '../MuiProps';

export interface DividerProps
  extends StandardProps<React.HTMLAttributes<HTMLHRElement>, DividerClassKey> {
  absolute?: boolean;
  inset?: boolean;
  light?: boolean;
}

export type DividerClassKey = 'root' | 'default' | 'inset' | 'light' | 'absolute';

declare const Divider: React.ComponentType<DividerProps>;

export default Divider;
