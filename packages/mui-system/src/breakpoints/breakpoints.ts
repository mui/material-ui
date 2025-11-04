import PropTypes from 'prop-types';
import deepmerge from '@mui/utils/deepmerge';
import merge from '../merge';
import { isCqShorthand, getContainerQuery } from '../cssContainerQueries';

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
  up: (key: string) => `@media (min-width:${values[key as keyof typeof values]}px)`,
};

const defaultContainerQueries = {
  containerQueries: (containerName: string) => ({
    up: (key: string | number) => {
      let result: string | number = typeof key === 'number' ? key : values[key as keyof typeof values] || key;
      if (typeof result === 'number') {
        result = `${result}px`;
      }
      return containerName
        ? `@container ${containerName} (min-width:${result})`
        : `@container (min-width:${result})`;
    },
  }),
};

export function handleBreakpoints(props: any, propValue: any, styleFromPropValue: (value: any, breakpoint?: any) => any): any {
  const theme = props.theme || {};

  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {} as any);
  }

  if (typeof propValue === 'object') {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (isCqShorthand(themeBreakpoints.keys, breakpoint)) {
        const containerKey = getContainerQuery(
          theme.containerQueries ? theme : defaultContainerQueries,
          breakpoint,
        );
        if (containerKey) {
          acc[containerKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
        }
      }
      // key is breakpoint
      else if (Object.keys(themeBreakpoints.values || values).includes(breakpoint)) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {} as any);
  }

  const output = styleFromPropValue(propValue);

  return output;
}

function breakpoints(styleFunction: any): any {
  // false positive
  // eslint-disable-next-line react/function-component-definition
  const newStyleFunction = (props: any) => {
    const theme = props.theme || {};
    const base = styleFunction(props);
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;

    const extended = themeBreakpoints.keys.reduce((acc: any, key: string) => {
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

export function createEmptyBreakpointObject(breakpointsInput: any = {}): any {
  const breakpointsInOrder = breakpointsInput.keys?.reduce((acc: any, key: string) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}

export function removeUnusedBreakpoints(breakpointKeys: string[], style: any): any {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style);
}

export function mergeBreakpointsInOrder(breakpointsInput: any, ...styles: any[]): any {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpointsInput);
  const mergedOutput = [emptyBreakpoints, ...styles].reduce(
    (prev, next) => deepmerge(prev, next),
    {},
  );
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
}

// compute base for responsive values; e.g.,
// [1,2,3] => {xs: true, sm: true, md: true}
// {xs: 1, sm: 2, md: 3} => {xs: true, sm: true, md: true}
export function computeBreakpointsBase(breakpointValues: any, themeBreakpoints: any): any {
  // fixed value
  if (typeof breakpointValues !== 'object') {
    return {};
  }
  const base: any = {};
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
}: any): any {
  const base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
  const keys = Object.keys(base);

  if (keys.length === 0) {
    return breakpointValues;
  }

  let previous: any;

  return keys.reduce((acc: any, breakpoint: string, i: number) => {
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
