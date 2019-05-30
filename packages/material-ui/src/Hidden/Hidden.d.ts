import * as React from 'react';
import { Breakpoint } from '../styles/createBreakpoints';

export interface HiddenProps {
  implementation?: 'js' | 'css';
  initialWidth?: Breakpoint;
  lgDown?: boolean;
  lgUp?: boolean;
  mdDown?: boolean;
  mdUp?: boolean;
  only?: Breakpoint | Breakpoint[];
  smDown?: boolean;
  smUp?: boolean;
  xlDown?: boolean;
  xlUp?: boolean;
  xsDown?: boolean;
  xsUp?: boolean;
}

declare const Hidden: React.ComponentType<HiddenProps>;

export default Hidden;
