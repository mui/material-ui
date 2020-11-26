import merge from './merge';
import getThemeValue from './getThemeValue';
import { handleBreakpoints, mergeBreakpointsInOrder } from './breakpoints';
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
  'sx',
];

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
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

  let css = {};

  Object.keys(styles).forEach((styleKey) => {
    const value = callIfFn(styles[styleKey], theme);

    if (typeof value === 'object') {
      if (filterProps.indexOf(styleKey) !== -1) {
        css = merge(css, getThemeValue(styleKey, value, theme));
      } else {
        const breakpointsValues = handleBreakpoints({ theme }, value, (x) => ({
          [styleKey]: x,
        }));

        if (objectsHaveSameKeys(breakpointsValues, value)) {
          const transformedValue = styleFunctionSx({ sx: value, theme });
          css[styleKey] = transformedValue;
        } else {
          css = merge(css, breakpointsValues);
        }
      }
    } else {
      css = merge(css, getThemeValue(styleKey, value, theme));
    }
  });

  return mergeBreakpointsInOrder(theme.breakpoints, css);
}

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
