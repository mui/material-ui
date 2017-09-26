import * as React from 'react';
import { StyledComponent } from '..';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  absolute?: boolean;
  inset?: boolean;
  light?: boolean;
}

export type DividerClassKey =
  | 'root'
  | 'default'
  | 'inset'
  | 'light'
  | 'absolute'
  ;

declare const Divider: StyledComponent<DividerProps, DividerClassKey>;

export default Divider;
