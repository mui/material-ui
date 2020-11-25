import getThemeValue from './getThemeValue';
import {
  handleBreakpoints,
  createEmptyBreakpointObjectOfArrays,
  removeUnusedBreakpoints,
} from './breakpoints';
import borders from './borders';
import display from './display';
import flexbox from './flexbox';
import grid from './grid';
import positions from './positions';
import palette from './palette';
import shadows from './shadows';
import sizing from './sizing';
import spacing from './spacing';
import typography from './typography';
import merge from './merge';

const filterProps = [
  ...borders.filterProps,
  ...display.filterProps,
  ...flexbox.filterProps,
  ...grid.filterProps,
  ...positions.filterProps,
  ...palette.filterProps,
  ...shadows.filterProps,
  ...sizing.filterProps,
  ...spacing.filterProps,
  ...typography.filterProps,
];

function objectsHaveSameKeys(...objects) {
  const objectsKeysLength = [];

  const allKeys = objects.reduce((keys, object) => {
    const objectKeys = Object.keys(object);

    objectsKeysLength.push(objectKeys.length);
    return keys.concat(objectKeys);
  }, []);

  const union = new Set(allKeys);

  return objectsKeysLength.every((objectLength) => union.size === objectLength);
}

function isMediaQuery(str) {
  return str.charAt(0) === '@';
}

function callable(maybeFn, ...args) {
  return typeof maybeFn === 'function' ? maybeFn(...args) : maybeFn;
}

function styleFunctionSx(props) {
  const { sx: styles, theme } = props || {};
  if (!styles) return null;

  if (typeof styles === 'function') {
    return styles(theme);
  }

  if (typeof styles !== 'object') {
    // value
    return styles;
  }

  const emptyBreakpoints = createEmptyBreakpointObjectOfArrays(theme.breakpoints);
  const breakpointsKeys = Object.keys(emptyBreakpoints);

  const mediaQueriesValues = emptyBreakpoints;

  const css = {};

  Object.keys(styles).forEach((styleKey) => {
    const value = callable(styles[styleKey], theme);

    if (!isMediaQuery(styleKey)) {
      // simple CSS value
      if (typeof value === 'object') {
        // breakpoints object
        let result = {};

        if (filterProps.indexOf(styleKey) !== -1) {
          result = getThemeValue(styleKey, value, theme);
        } else {
          const breakpointsValues = handleBreakpoints({ theme }, value, (x) => ({
            [styleKey]: x,
          }));

          if (objectsHaveSameKeys(breakpointsValues, value)) {
            css[styleKey] = styleFunctionSx({ sx: styles[styleKey], theme });
            return;
          }

          result = breakpointsValues;
        }

        Object.keys(result).forEach((breakpointKey) => {
          // media query
          if (!mediaQueriesValues[breakpointKey]) {
            mediaQueriesValues[breakpointKey] = [];
          }
          mediaQueriesValues[breakpointKey].push(result[breakpointKey]);
        });
      } else {
        // simple value no need for deepmerge
        const result = getThemeValue(styleKey, value, theme);
        Object.keys(result).forEach((key) => {
          css[key] = result[key];
        });
      }
    } else {
      const resolvedValue = styleFunctionSx(value);

      // media query
      if (!mediaQueriesValues[styleKey]) {
        mediaQueriesValues[styleKey] = [];
      }
      mediaQueriesValues[styleKey].push(resolvedValue);
    }
  });

  Object.keys(mediaQueriesValues).forEach((mediaQueryKey) => {
    css[mediaQueryKey] = mediaQueriesValues[mediaQueryKey].reduce(
      (acc, next) => merge(acc, next),
      {},
    );
  });

  return removeUnusedBreakpoints(breakpointsKeys, css);
}

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
