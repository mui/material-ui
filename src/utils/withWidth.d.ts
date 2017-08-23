import { Breakpoint } from '../styles/breakpoints';
export interface WithWidthOptions {
  resizeInterval: number;
}

export interface WithWidthEnhancement {
  width: number;
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
) => React.ComponentClass<P & WithWidthEnhancement>;
