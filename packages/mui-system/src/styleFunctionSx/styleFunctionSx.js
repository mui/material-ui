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
  const { sx, theme = {} } = props || {};
  if (!sx) {
    return null; // emotion & styled-components will neglect null
  }

  /*
   * Receive `sxInput` as object or callback
   * and then recursively check keys & values to create media query object styles.
   * (the result will be used in `styled`)
   */
  function traverse(sxInput) {
    let sxObject = sxInput;
    if (typeof sxInput === 'function') {
      sxObject = sxInput(theme);
    } else if (typeof sxInput !== 'object') {
      // value
      return sxInput;
    }
    const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
    const breakpointsKeys = Object.keys(emptyBreakpoints);

    let css = emptyBreakpoints;

    Object.keys(sxObject).forEach((styleKey) => {
      const value = callIfFn(sxObject[styleKey], theme);
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

  return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
}

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
