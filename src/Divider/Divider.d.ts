import * as React from 'react';
import { StyledComponent } from '..';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  absolute?: boolean;
  inset?: boolean;
  light?: boolean;
}

export default class Divider extends StyledComponent<DividerProps> {}
