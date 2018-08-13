import { Breakpoint } from '../styles/createBreakpoints';
import { AnyComponent, ConsistentWith, Overwrite } from '..';

export interface WithWidthOptions {
  resizeInterval: number;
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
): <P extends ConsistentWith<P, WithWidth>>(
  component: AnyComponent<P & WithWidth>,
) => React.ComponentType<Overwrite<P, Partial<WithWidth>>>;
