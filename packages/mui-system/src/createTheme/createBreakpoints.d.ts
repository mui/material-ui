import { OverridableStringUnion } from '@mui/types';

export interface BreakpointOverrides {}

export type Breakpoint = OverridableStringUnion<
  'xs' | 'sm' | 'md' | 'lg' | 'xl',
  BreakpointOverrides
>;
export const keys: Breakpoint[];

export interface Breakpoints {
  keys: Breakpoint[];
  values: { [key in Breakpoint]: number };
  up: (key: Breakpoint | number) => string;
  down: (key: Breakpoint | number) => string;
  between: (start: Breakpoint | number, end: Breakpoint | number) => string;
  only: (key: Breakpoint) => string;
}

export interface BreakpointsOptions extends Partial<Breakpoints> {
  step?: string | undefined;
  unit?: string | undefined;
}

export default function createBreakpoints(options: BreakpointsOptions): Breakpoints;
