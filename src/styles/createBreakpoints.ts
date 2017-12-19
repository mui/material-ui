export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const keys: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export type BreakpointValues = { [key in Breakpoint]: number };

export interface Breakpoints {
  keys: Breakpoint[];
  values: BreakpointValues;
  up: (key: Breakpoint) => string;
  down: (key: Breakpoint) => string;
  between: (start: Breakpoint, end: Breakpoint) => string;
  only: (key: Breakpoint) => string;
  width: (key: Breakpoint) => number;
}

export type BreakpointsOptions = Partial<
  {
    unit: string;
    step: number;
  } & Breakpoints
>;

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(options: BreakpointsOptions): Breakpoints {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm[.
    values = {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    unit = 'px',
    step = 5,
    ...other
  } = options;

  function up(key: Breakpoint) {
    const value = values[key];
    return `@media (min-width:${value}${unit})`;
  }

  function down(key: Breakpoint) {
    const value: number = values[key];
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start: Breakpoint, end: Breakpoint) {
    const endIndex = keys.indexOf(end) + 1;

    if (endIndex === keys.length) {
      return up(start);
    }

    return (
      `@media (min-width:${values[start]}${unit}) and ` +
      `(max-width:${values[keys[endIndex]] - step / 100}${unit})`
    );
  }

  function only(key: Breakpoint) {
    return between(key, key);
  }

  function width(key: Breakpoint) {
    return values[key];
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    width,
    ...other,
  };
}
