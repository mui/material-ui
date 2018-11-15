import * as React from 'react';
import { StandardProps } from '..';

export interface DividerProps
  extends StandardProps<React.HTMLAttributes<HTMLHRElement>, DividerClassKey> {
  absolute?: boolean;
  component?: React.ReactType<DividerProps>;
  inset?: boolean;
  light?: boolean;
  variant?: 'fullWidth' | 'inset' | 'middle';
}

export type DividerClassKey = 'root' | 'absolute' | 'inset' | 'light' | 'middle';

declare const Divider: React.ComponentType<DividerProps>;

export default Divider;
