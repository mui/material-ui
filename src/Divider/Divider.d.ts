import * as React from 'react';
import { StyledComponent } from '..';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  absolute?: boolean;
  inset?: boolean;
  light?: boolean;
}

declare const Divider: StyledComponent<DividerProps>;

export default Divider;
