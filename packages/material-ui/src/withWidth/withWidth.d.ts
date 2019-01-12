import { Breakpoint } from '../styles/createBreakpoints';
import { PropInjector } from '..';

export interface WithWidthOptions {
  withTheme?: boolean;
  noSSR?: boolean;
  initialWidth?: Breakpoint;
  resizeInterval?: number;
}

export interface WithWidth {
  width: Breakpoint;
  innerRef?: React.Ref<any> | React.RefObject<any>;
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
): PropInjector<WithWidth, Partial<WithWidth>>;
