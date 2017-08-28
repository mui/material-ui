import * as React from 'react';
import { StyledComponent } from '..';
import { Breakpoint } from '../styles/breakpoints';

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

export default class HiddenJs extends StyledComponent<HiddenJsProps> {}
