import { unstable_capitalize as capitalize } from '@mui/utils';
import merge from '../merge';
import { getPath, getStyleValue as getValue } from '../style';
import {
  handleBreakpoints,
  createEmptyBreakpointObject,
  removeUnusedBreakpoints,
} from '../breakpoints';
import defaultSxConfig from './defaultSxConfig';

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme, config) {
    const props = {
      [prop]: val,
      theme,
    };

    const options = config[prop];

    if (!options) {
      return { [prop]: val };
    }

    const { cssProperty = prop, themeKey, transform, style } = options;

    if (val == null) {
      return null;
    }

    if (themeKey === 'typography' && val === 'inherit') {
      return { [prop]: val };
    }

    const themeMapping = getPath(theme, themeKey) || {};

    if (style) {
      return style(props);
    }

    const styleFromPropValue = (propValueFinal) => {
      let value = getValue(themeMapping, transform, propValueFinal);

      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getValue(
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

  const sortMediaQueries = (mediaQueries) => {
    const sortedMediaQueries = {};
    Object.keys(mediaQueries)
      .sort((a, b) =>
        a.localeCompare(b, undefined, {
          numeric: true,
        }),
      )
      .forEach((key) => {
        sortedMediaQueries[key] = mediaQueries[key];
      });
    return sortedMediaQueries;
  };

  const separateMediaQueries = (sxOutput) => {
    const mediaQueryObj = {};
    const restObj = {};
    Object.keys(sxOutput).forEach((key) => {
      if (key.includes('@media')) {
        mediaQueryObj[key] = sxOutput[key];
      } else {
        restObj[key] = sxOutput[key];
      }
    });
    return { mediaQueryObj, restObj };
  };

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
      let shouldSort = false;

      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            if (config[styleKey]) {
              css = merge(css, getThemeValue(styleKey, value, theme, config));
            } else {
              if (styleKey.includes('@media')) {
                shouldSort = true;
              }
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
            css = merge(css, getThemeValue(styleKey, value, theme, config));
          }
        }
      });

      const sxOutput = removeUnusedBreakpoints(breakpointsKeys, css);

      if (!shouldSort) {
        return sxOutput;
      }

      shouldSort = false;
      const { mediaQueryObj, restObj } = separateMediaQueries(sxOutput);
      const sortedMediaQueries = sortMediaQueries(mediaQueryObj);
      return { ...sortedMediaQueries, ...restObj };
    }

    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }

  return styleFunctionSx;
}

const styleFunctionSx = unstable_createStyleFunctionSx();

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
