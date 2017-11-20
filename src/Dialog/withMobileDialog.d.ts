import { Breakpoint } from '../styles/createBreakpoints';
import { WithWidthProps } from '../utils/withWidth';

export interface WithMobileDialogOptions {
  breakpoint: Breakpoint;
}

export default function withMobileDialog<P = {}>(
  options: WithMobileDialogOptions
): (
  component: React.ComponentType<P & Partial<WithWidthProps>>
) => React.ComponentClass<P & Partial<WithWidthProps>>;
