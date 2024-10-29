import capitalize from '@mui/utils/capitalize';
import merge from '../merge';
import { getPath, getStyleValue } from '../style';
import {
  handleBreakpoints,
  createEmptyBreakpointObject,
  removeUnusedBreakpoints,
} from '../breakpoints';
import { sortContainerQueries } from '../cssContainerQueries';
import defaultSxConfig from './defaultSxConfig';

function objectsHaveSameKeys(a, b) {
  let aLength = 0;
  let bLength = 0;

  /* eslint-disable guard-for-in */
  for (const key in a) {
    aLength += 1;

    if (!(key in b)) {
      return false;
    }
  }

  /* eslint-disable-next-line */
  for (const _ in b) {
    bLength += 1;
  }
  return aLength === bLength;
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}

function getThemeValue(prop, val, theme, config) {
  const options = config[prop];

  if (!options) {
    return { [prop]: val };
  }

  const { cssProperty = prop, themeKey, transform, style } = options;

  if (val == null) {
    return null;
  }

  // TODO v6: remove, see https://github.com/mui/material-ui/pull/38123
  if (themeKey === 'typography' && val === 'inherit') {
    return { [prop]: val };
  }

  const props = {
    [prop]: val,
    theme,
  };

  if (style) {
    return style(props);
  }

  const themeMapping = getPath(theme, themeKey) || {};

  const styleFromPropValue = (propValueFinal) => {
    let value = getStyleValue(themeMapping, transform, propValueFinal);

    if (propValueFinal === value && typeof propValueFinal === 'string') {
      // Haven't found value
      value = getStyleValue(
        themeMapping,
        transform,
        `${prop}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`,
        propValueFinal,
      );
    }

    if (cssProperty === false) {
      return value;
    }

    return {
      [cssProperty]: value,
    };
  };

  return handleBreakpoints(props, val, styleFromPropValue);
}


// eslint-disable-next-line @typescript-eslint/naming-convention
export function unstable_createStyleFunctionSx() {
  function styleFunctionSx(props) {
    const { sx, theme = {} } = props || {};

    if (!sx) {
      return null; // Emotion & styled-components will neglect null
    }

    const config = theme.unstable_sxConfig ?? defaultSxConfig;

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
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);

      let css = emptyBreakpoints;

      for (let styleKey in sxObject) {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value === null || value === undefined) {
          continue;
        }
        if (typeof value !== 'object') {
          css = merge(css, getThemeValue(styleKey, value, theme, config));
        } else {
          if (config[styleKey]) {
            css = merge(css, getThemeValue(styleKey, value, theme, config));
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
        }
      }

      return sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css));
    }

    debugger
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }

  return styleFunctionSx;
}

const styleFunctionSx = unstable_createStyleFunctionSx();

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
