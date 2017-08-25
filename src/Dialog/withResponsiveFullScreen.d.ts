import { Breakpoint } from '../styles/createBreakpoints';
import { WithWidthProps } from '../utils/withWidth';

export interface WithResponsiveFullScreenOptions {
  breakpoint: Breakpoint;
}

export default function withResponsiveFullScreen<P = {}>(
  options: WithResponsiveFullScreenOptions
): (
  component: React.ComponentType<P & Partial<WithWidthProps>>
) => React.ComponentClass<P & Partial<WithWidthProps>>;
