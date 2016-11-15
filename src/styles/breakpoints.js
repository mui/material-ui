// @flow weak

export default function createBreakpoints(
  breakpoints = {
    xs: 360,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  unit = 'px',
  step = 1,
) {
  const keys = Object.keys(breakpoints);
  const values = keys.map((n) => breakpoints[n]);

  function up(name) {
    const value = breakpoints[name] || name;
    return `@media (min-width:${value}${unit})`;
  }

  function down(name) {
    const value = breakpoints[name] || name;
    return `@media (max-width:${value}${unit})`;
  }

  function between(start, end) {
    const startIndex = keys.indexOf(start);
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${values[startIndex]}${unit}) and (max-width:${
      values[endIndex + 1] - step}${unit})`;
  }

  function only(name) {
    const keyIndex = keys.indexOf(name);
    if (keyIndex === values.length - 1) {
      return up(name);
    }
    return between(name, name);
  }

  function getWidth(name) {
    return breakpoints[name];
  }

  return { keys, values, up, down, only, getWidth };
}
