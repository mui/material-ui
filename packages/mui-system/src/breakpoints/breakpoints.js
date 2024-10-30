import PropTypes from 'prop-types';
import isObjectEmpty from '@mui/utils/isObjectEmpty';
import deepmerge from '@mui/utils/deepmerge';
import merge from '../merge';
import { isCqShorthand, getContainerQuery } from '../cssContainerQueries';

/* eslint-disable guard-for-in */

// The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.
export const values = {
  xs: 0, // phone
  sm: 600, // tablet
  md: 900, // small laptop
  lg: 1200, // desktop
  xl: 1536, // large screen
};

const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: (key) => `@media (min-width:${values[key]}px)`,
};

const defaultContainerQueries = {
  containerQueries: (containerName) => ({
    up: (key) => {
      let result = typeof key === 'number' ? key : values[key] || key;
      if (typeof result === 'number') {
        result = `${result}px`;
      }
      return containerName
        ? `@container ${containerName} (min-width:${result})`
        : `@container (min-width:${result})`;
    },
  }),
};

const EMPTY_BREAKPOINTS = {
  keys: [],
  up: (key) => `@media (min-width:${values[key]}px)`,
};

export function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};

  if (Array.isArray(propValue)) {
    const breakpoints = theme.breakpoints || defaultBreakpoints;
    const result = {};
    for (let i = 0; i < propValue.length; i += 1) {
      result[breakpoints.up(breakpoints.keys[i])] = styleFromPropValue(propValue[i]);
    }
    return result;
  }

  if (typeof propValue === 'object') {
    const breakpoints = theme.breakpoints || defaultBreakpoints;
    const breakpointValues = breakpoints.values ?? values;
    const result = {};

    for (const key in propValue) {
      if (isCqShorthand(breakpoints.keys, key)) {
        const containerKey = getContainerQuery(
          theme.containerQueries ? theme : defaultContainerQueries,
          key,
        );
        if (containerKey) {
          result[containerKey] = styleFromPropValue(propValue[key], key);
        }
      }
      // key is key
      else if (key in breakpointValues) {
        const mediaKey = breakpoints.up(key);
        result[mediaKey] = styleFromPropValue(propValue[key], key);
      } else {
        const cssKey = key;
        result[cssKey] = propValue[cssKey];
      }
    }

    return result;
  }

  return styleFromPropValue(propValue);
}

function breakpoints(styleFunction) {
  // eslint-disable-next-line react/function-component-definition
  const newStyleFunction = (props) => {
    const theme = props.theme || {};
    const base = styleFunction(props);
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;

    const extended = themeBreakpoints.keys.reduce((acc, key) => {
      if (props[key]) {
        acc = acc || {};
        acc[themeBreakpoints.up(key)] = styleFunction({ theme, ...props[key] });
      }
      return acc;
    }, null);

    return merge(base, extended);
  };

  newStyleFunction.propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          ...styleFunction.propTypes,
          xs: PropTypes.object,
          sm: PropTypes.object,
          md: PropTypes.object,
          lg: PropTypes.object,
          xl: PropTypes.object,
        }
      : {};

  newStyleFunction.filterProps = ['xs', 'sm', 'md', 'lg', 'xl', ...styleFunction.filterProps];

  return newStyleFunction;
}

export function createEmptyBreakpointObject(breakpoints = EMPTY_BREAKPOINTS) {
  const result = {};
  for (let i = 0; i < breakpoints.keys.length; i += 1) {
    result[breakpoints.up(breakpoints.keys[i])] = {};
  }
  return result;
}

export function removeUnusedBreakpoints(breakpointKeys, style) {
  for (let i = 0; i < breakpointKeys.length; i += 1) {
    const key = breakpointKeys[i];

    if (isObjectEmpty(style[key])) {
      delete style[key];
    }
  }

  return style;
}

export function mergeBreakpointsInOrder(breakpoints, ...styles) {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpoints);
  const mergedOutput = [emptyBreakpoints, ...styles].reduce(
    (prev, next) => deepmerge(prev, next),
    {},
  );
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
}

// compute base for responsive values; e.g.,
// [1,2,3] => {xs: true, sm: true, md: true}
// {xs: 1, sm: 2, md: 3} => {xs: true, sm: true, md: true}
export function computeBreakpointsBase(breakpointValues, themeBreakpoints) {
  // fixed value
  if (typeof breakpointValues !== 'object') {
    return {};
  }
  const base = {};
  const breakpointsKeys = Object.keys(themeBreakpoints);
  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach((breakpoint, i) => {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach((breakpoint) => {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
}

export function resolveBreakpointValues({
  values: breakpointValues,
  breakpoints: themeBreakpoints,
  base: customBase,
}) {
  const base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
  const keys = Object.keys(base);

  if (keys.length === 0) {
    return breakpointValues;
  }

  let previous;

  return keys.reduce((acc, breakpoint, i) => {
    if (Array.isArray(breakpointValues)) {
      acc[breakpoint] =
        breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
      previous = i;
    } else if (typeof breakpointValues === 'object') {
      acc[breakpoint] =
        breakpointValues[breakpoint] != null
          ? breakpointValues[breakpoint]
          : breakpointValues[previous];
      previous = breakpoint;
    } else {
      acc[breakpoint] = breakpointValues;
    }
    return acc;
  }, {});
}

export default breakpoints;
