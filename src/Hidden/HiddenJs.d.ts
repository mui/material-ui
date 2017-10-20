import * as React from 'react';
import { Breakpoint } from '../styles/createBreakpoints';

export interface HiddenJsProps {
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
}

declare const HiddenJs: React.ComponentType<HiddenJsProps>;

export default HiddenJs;
