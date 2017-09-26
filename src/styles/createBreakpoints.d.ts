export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BreakpointValues = { [key in Breakpoint]: number };
export const keys: Breakpoint[];

export interface BreakpointsOptions {
  values: BreakpointValues;
  unit: string;
  step: number;
}

export interface Breakpoints {
  keys: typeof keys;
  values: BreakpointValues;
  up: (key: Breakpoint | number) => string;
  down: (key: Breakpoint | number) => string;
  between: (start: Breakpoint, end: Breakpoint) => string;
  only: (key: Breakpoint) => string;
  width: (key: Breakpoint) => number;
}

export default function createBreakpoints(
  options: Partial<BreakpointsOptions> & Partial<Breakpoints>
): Breakpoints;
