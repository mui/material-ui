import warning from 'warning';

/* eslint-disable import/prefer-default-export */

// The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.
const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: key => `@media (min-width:${values[key]}px)`,
};

export function handleBreakpoints(props, propValue, styleFromPropValue, prop) {
  warning(
    props.theme,
    '@material-ui/system: you are calling a style function without a theme value.',
  );

  const breakpoints = props.theme.breakpoints || defaultBreakpoints;

  if (Array.isArray(propValue)) {
    return propValue.reduce((acc, item, index) => {
      acc[breakpoints.up(breakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }

  if (typeof propValue === 'object') {
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      acc[breakpoints.up(breakpoint)] = styleFromPropValue(propValue[breakpoint]);
      return acc;
    }, {});
  }

  const output = styleFromPropValue(propValue);

  return breakpoints.keys.reduce((acc, key) => {
    const propBreakpoint = props[key];

    if (propBreakpoint) {
      const propValue2 = propBreakpoint[prop];
      if (propValue2) {
        acc[breakpoints.up(key)] = styleFromPropValue(propValue2);
      }
    }

    return acc;
  }, output);
}
