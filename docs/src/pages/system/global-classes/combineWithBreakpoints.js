export default function combineWithBreakpoints(theme, obj) {
  const result = {};

  theme.breakpoints.keys.forEach((breakpoint) => {
    Object.keys(obj).forEach((selector) => {
      result[`.${breakpoint}\\:${selector}`] = {
        [theme.breakpoints.up(breakpoint)]: obj[selector],
      };
    });
  });

  Object.keys(obj).forEach((selector) => {
    result[`.${selector}`] = obj[selector];
  });

  return result;
}
