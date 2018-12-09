import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export interface UseWidthOptions {
  initialWidth?: Breakpoint;
  resizeInterval?: number;
  width?: Breakpoint;
}

export default function unstable_useWidth(options?: UseWidthOptions): string;
