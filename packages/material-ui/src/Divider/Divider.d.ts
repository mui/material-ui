import * as React from 'react';
import { StandardProps } from '..';

export interface DividerProps
  extends StandardProps<React.HTMLAttributes<HTMLHRElement>, DividerClassKey> {
  absolute?: boolean;
  component?: React.ReactType<DividerProps>;
  light?: boolean;
  subheader?: string;
  variant?: 'fullBleed' | 'inset' | 'middle';
}

export type DividerClassKey = 'root' | 'absolute' | 'inset' | 'light' | 'middle' | 'subheader';

declare const Divider: React.ComponentType<DividerProps>;

export default Divider;
