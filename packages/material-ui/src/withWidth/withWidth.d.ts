import { Breakpoint } from '../styles/createBreakpoints';
import { ConsistentWith, Overwrite } from '..';

export interface WithWidthOptions {
  resizeInterval: number;
}

export interface WithWidthProps {
  width: Breakpoint;
}

export function isWidthDown(
  breakpoint: Breakpoint,
  screenWidth: Breakpoint,
  inclusive?: boolean,
): boolean;

export function isWidthUp(
  breakpoint: Breakpoint,
  screenWidth: Breakpoint,
  inclusive?: boolean,
): boolean;

export default function withWidth(
  options?: WithWidthOptions,
): <P extends ConsistentWith<P, WithWidthProps>>(
  component: React.ComponentType<P & WithWidthProps>,
) => React.ComponentClass<Overwrite<P, Partial<WithWidthProps>>>;
