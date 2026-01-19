import capitalize from '@mui/utils/capitalize';
import merge from '../merge';
import { getPath, getStyleValue as getValue } from '../style';
import {
  handleBreakpoints,
  createEmptyBreakpointObject,
  removeUnusedBreakpoints,
} from '../breakpoints';
import { sortContainerQueries } from '../cssContainerQueries';
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

    // TODO v6: remove, see https://github.com/mui/material-ui/pull/38123
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

  function styleFunctionSx(props) {
    const { sx, theme = {}, nested } = props || {};

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

      Object.keys(sxObject).forEach((styleKey) => {
        let resolvedStyleKey = styleKey;
        if (styleKey.startsWith('@')) {
          const match = styleKey.match(/^@([^/]*)(?:\/(.+))?$/);

          if (match) {
            const [, rawSize, container] = match;

            let size = rawSize;
            let finalContainer = container;

            if (!finalContainer) {
              const siblingWithContainer = Object.keys(sxObject).find(
                (key) => key.startsWith('@') && key.includes('/'),
              );

              if (siblingWithContainer) {
                finalContainer = siblingWithContainer.split('/')[1];
              }
            }

            if (rawSize === '') {
              size = '0';
            } else if (theme?.breakpoints?.values?.[rawSize] !== undefined) {
              size = String(theme.breakpoints.values[rawSize]);
            }

            resolvedStyleKey = `@${size}${finalContainer ? `/${finalContainer}` : ''}`;
          }
        }
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            if (config[resolvedStyleKey]) {
              css = merge(css, getThemeValue(resolvedStyleKey, value, theme, config));
            } else {
              const breakpointsValues = handleBreakpoints({ theme }, value, (x) => ({
                [resolvedStyleKey]: x,
              }));

              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css[resolvedStyleKey] = styleFunctionSx({ sx: value, theme, nested: true });
              } else {
                css = merge(css, breakpointsValues);
              }
            }
          } else {
            css = merge(css, getThemeValue(resolvedStyleKey, value, theme, config));
          }
        }
      });

      if (!nested && theme.modularCssLayers) {
        return {
          '@layer sx': sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css)),
        };
      }

      return sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css));
    }

    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }

  return styleFunctionSx;
}

const styleFunctionSx = unstable_createStyleFunctionSx();

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
