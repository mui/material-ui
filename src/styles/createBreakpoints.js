// @flow

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const keys = ['xs', 'sm', 'md', 'lg', 'xl'];

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(breakpoints: Object) {
  const {
    values = {
      xs: 360,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    unit = 'px',
    step = 5,
    ...other
  } = breakpoints;

  function up(key) {
    let value;
    // min-width of xs starts at 0
    if (key === 'xs') {
      value = 0;
    } else {
      value = values[key] || key;
    }
    return `@media (min-width:${value}${unit})`;
  }

  function down(key) {
    const value = values[key] || key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start, end) {
    const startIndex = keys.indexOf(start);
    const endIndex = keys.indexOf(end);
    return (
      `@media (min-width:${values[keys[startIndex]]}${unit}) and ` +
      `(max-width:${values[keys[endIndex + 1]] - step / 100}${unit})`
    );
  }

  function only(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === keys.length - 1) {
      return up(key);
    }
    return between(key, key);
  }

  function width(key) {
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
