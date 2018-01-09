import * as React from 'react';
import { Breakpoint } from '../styles/createBreakpoints';

export interface HiddenCssProps {
  lgDown?: boolean;
  lgUp?: boolean;
  mdDown?: boolean;
  mdUp?: boolean;
  only?: Breakpoint | Array<Breakpoint>;
  smDown?: boolean;
  smUp?: boolean;
  xlDown?: boolean;
  xlUp?: boolean;
  xsDown?: boolean;
  xsUp?: boolean;
}

declare const HiddenCss: React.ComponentType<HiddenCssProps>;

export default HiddenCss;
