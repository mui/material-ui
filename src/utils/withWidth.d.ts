import { Breakpoint } from '../styles/createBreakpoints';

export interface WithWidthOptions {
  resizeInterval: number;
}

export interface WithWidthProps {
  width: Breakpoint;
}

export function isWidthUp(
  breakpoint: Breakpoint,
  screenWidth: number,
  inclusive?: boolean
): boolean;

export default function withWidth<P = {}>(
  options?: WithWidthOptions
): (
  component: React.ComponentType<P>
) => React.ComponentClass<P & WithWidthProps>;
