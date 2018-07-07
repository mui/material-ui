import * as React from 'react';
import { StandardProps } from '..';

export interface DividerProps<C = {}>
  extends StandardProps<React.HTMLAttributes<HTMLHRElement>, DividerClassKey> {
  absolute?: boolean;
  component?: React.ReactType<C>;
  inset?: boolean;
  light?: boolean;
}

export type DividerClassKey = 'root' | 'absolute' | 'inset' | 'light';

declare class Divider<C> extends React.Component<C & DividerProps<C>> {}

export default Divider;
