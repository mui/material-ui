import * as React from 'react';
import { StandardProps } from '..';
import { Breakpoint } from '../styles/createBreakpoints';

export interface HiddenProps extends StandardProps<{}, never> {
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
