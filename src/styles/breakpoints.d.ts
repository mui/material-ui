export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BreakpointMap = { [key in Breakpoint]: number };
export const keys: Breakpoint[];

export interface BreakpointsOptions {
  breakpoints: BreakpointMap;
  unit: string;
  step: number;
}

export interface Breakpoints {
  keys: typeof keys;
  values: number[];
  up: (key: Breakpoint) => string;
  down: (key: Breakpoint) => string;
  between: (start: Breakpoint, end: Breakpoint) => string;
  only: (key: Breakpoint) => string;
  getWidth: (key: Breakpoint) => number;
}

export default function createBreakpoints(
  options?: Partial<BreakpointsOptions>
): Breakpoints;
