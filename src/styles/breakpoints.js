// @flow weak

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Sorted ASC by size. That's important.
export const keys = ['xs', 'sm', 'md', 'lg', 'xl'];

const defaultBreakpoints = {
  xs: 360,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(breakpoints = defaultBreakpoints, unit = 'px', step = 1) {
  const values = keys.map(key => breakpoints[key]);

  function up(name) {
    let value;
    // min-width of xs starts at 0
    if (name === 'xs') {
      value = 0;
    } else {
      value = breakpoints[name] || name;
    }
    return `@media (min-width:${value}${unit})`;
  }

  function down(name) {
    const value = breakpoints[name] || name;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start, end) {
    const startIndex = keys.indexOf(start);
    const endIndex = keys.indexOf(end);
    return (
      `@media (min-width:${values[startIndex]}${unit}) and ` +
      `(max-width:${values[endIndex + 1] - step / 100}${unit})`
    );
  }

  function only(name) {
    const keyIndex = keys.indexOf(name);
    if (keyIndex === keys.length - 1) {
      return up(name);
    }
    return between(name, name);
  }

  function getWidth(name) {
    return breakpoints[name];
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    getWidth,
  };
}
