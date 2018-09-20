import { Breakpoint } from '../styles/createBreakpoints';
import { WithWidth } from '../withWidth';

export interface WithMobileDialogOptions {
  breakpoint: Breakpoint;
}

export interface InjectedProps {
  fullScreen?: boolean;
}

export default function withMobileDialog<P = {}>(
  options?: WithMobileDialogOptions,
): (
  component: React.ComponentType<P & InjectedProps & Partial<WithWidth>>,
) => React.ComponentType<P & Partial<WithWidth>>;
