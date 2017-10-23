import * as React from 'react';
import { StandardProps } from '..';
import { Breakpoint } from '../styles/createBreakpoints';

export interface HiddenProps extends StandardProps<{}, never> {
  only?: Breakpoint | Array<Breakpoint>;
  xsUp?: boolean;
  smUp?: boolean;
  mdUp?: boolean;
  lgUp?: boolean;
  xlUp?: boolean;
  xsDown?: boolean;
  smDown?: boolean;
  mdDown?: boolean;
  lgDown?: boolean;
  xlDown?: boolean;
  implementation?: 'js' | 'css';
}

declare const Hidden: React.ComponentType<HiddenProps>;

export default Hidden;
