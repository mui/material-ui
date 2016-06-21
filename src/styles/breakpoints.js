
export default function createBreakpoints(
  breakpoints = {
    xs: 360,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  unit = 'px',
  step = 1
) {
  const keys = Object.keys(breakpoints);
  const values = keys.map((n) => breakpoints[n]);

  function up(name) {
    return `@media (min-width:${breakpoints[name]}${unit})`;
  }

  function down(name) {
    if (keys.indexOf(name) === values.length - 1) {
      return undefined;
    }
    return `@media (max-width:${breakpoints[name]}${unit})`;
  }

  function only(name) {
    const keyIndex = keys.indexOf(name);
    if (keyIndex === values.length - 1) {
      return up(name);
    }
    return between(name, name);
  }

  function between(start, end) {
    const startIndex = keys.indexOf(start);
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${values[startIndex]}${unit}) and (max-width:${values[endIndex + 1] - step}${unit})`;
  }

  return {keys, values, up, down, only};
}
