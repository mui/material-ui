// @flow
export default function createBreakpoints(
  breakpoints:{
    xs: number,
    sm: number,
    md: number,
    lg: number,
    xl: number,
  } = {
    xs: 360,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  unit:string = 'px',
  step:number = 1
):Breakpoints {
  const keys = Object.keys(breakpoints);
  const values = keys.map((n) => breakpoints[n]);

  function up(name:string) {
    return `@media (min-width:${breakpoints[name]}${unit})`;
  }

  function down(name:string) {
    if (keys.indexOf(name) === values.length - 1) {
      return undefined;
    }
    return `@media (max-width:${breakpoints[name]}${unit})`;
  }

  function only(name:string) {
    const keyIndex = keys.indexOf(name);
    if (keyIndex === values.length - 1) {
      return up(name);
    }
    return between(name, name);
  }

  function between(start:string, end:string) {
    const startIndex = keys.indexOf(start);
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${values[startIndex]}${unit}) and (max-width:${values[endIndex + 1] - step}${unit})`;
  }

  function getWidth(name:string) {
    return breakpoints[name];
  }

  return {keys, values, up, down, only, getWidth};
}
