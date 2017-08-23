import { Breakpoint } from '../styles/breakpoints';
import { WithWidthEnhancement } from '../utils/withWidth';

export interface WithResponsiveFullScreenOptions {
  breakpoint: Breakpoint;
}

export default function withResponsiveFullScreen<P>(
  options: WithResponsiveFullScreenOptions
): React.ComponentClass<P & WithWidthEnhancement>;
