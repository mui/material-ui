import merge from '../merge';
import getThemeValue, { propToStyleFunction } from '../getThemeValue';
import {
  handleBreakpoints,
  createEmptyBreakpointObject,
  removeUnusedBreakpoints,
} from '../breakpoints';

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}

function styleFunctionSx(props) {
  const { sx: styles, theme = {} } = props || {};
  if (!styles) return null;

  if (typeof styles === 'function') {
    return styles(theme);
  }

  if (typeof styles !== 'object') {
    // value
    return styles;
  }

  const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
  const breakpointsKeys = Object.keys(emptyBreakpoints);

  let css = emptyBreakpoints;

  Object.keys(styles).forEach((styleKey) => {
    const value = callIfFn(styles[styleKey], theme);

    if (typeof value === 'object') {
      if (propToStyleFunction[styleKey]) {
        css = merge(css, getThemeValue(styleKey, value, theme));
      } else {
        const breakpointsValues = handleBreakpoints({ theme }, value, (x) => ({
          [styleKey]: x,
        }));

        if (objectsHaveSameKeys(breakpointsValues, value)) {
          css[styleKey] = styleFunctionSx({ sx: value, theme });
        } else {
          css = merge(css, breakpointsValues);
        }
      }
    } else {
      css = merge(css, getThemeValue(styleKey, value, theme));
    }
  });

  return removeUnusedBreakpoints(breakpointsKeys, css);
}

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
