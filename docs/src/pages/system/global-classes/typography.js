import combineWithBreakpoints from './combineWithBreakpoints';

export default function typography(theme) {
  const typographys = {};

  Object.keys(theme.typography).forEach((key) => {
    if (typeof theme.typography[key] === 'object') {
      typographys[`typography-${key}`] = theme.typography[key];
    }
  });

  return combineWithBreakpoints(theme, typographys);
}
