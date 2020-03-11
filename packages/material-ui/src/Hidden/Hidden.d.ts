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

/**
 * Responsively hides children based on the selected implementation.
 *
 * Demos:
 * - {@link https://material-ui.com/components/hidden Hidden}
 *
 * API:
 * - {@link https://material-ui.com/api/Hidden Hidden API}
 * 
 */
declare const Hidden: React.ComponentType<HiddenProps>;

export default Hidden;
