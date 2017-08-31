import { Breakpoint } from '../styles/createBreakpoints';
import { WithWidthProps } from '../utils/withWidth';

export interface WithResponsiveFullScreenOptions {
  breakpoint: Breakpoint;
}

export default function withResponsiveFullScreen<P>(
  options: WithResponsiveFullScreenOptions
): React.ComponentClass<P & WithWidthProps>;
