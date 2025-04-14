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


export function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme, config) {
    const props = {
      [prop]: val,
      theme,
    };

    const options = config[prop];

    if (!options) {

      if (typeof val === 'object' && theme.breakpoints?.values) {
        const breakpointKeys = Object.keys(theme.breakpoints.values);
        const containerQueryMethods = ['up', 'down', 'between', 'only', 'not'];
        

        const hasBreakpointKey = Object.keys(val).some(key => breakpointKeys.includes(key));
        

        const hasContainerQueryMethod = Object.keys(val).some(key => containerQueryMethods.includes(key));
        
        if (hasBreakpointKey || hasContainerQueryMethod) {
          const containerStyles = {};
          
          Object.entries(val).forEach(([key, styles]) => {
            if (breakpointKeys.includes(key)) {

              const containerQuery = theme.containerQueries.up(key);
              containerStyles[containerQuery] = styles;
            } else if (containerQueryMethods.includes(key)) {

              if (typeof styles === 'object') {
                Object.entries(styles).forEach(([breakpoint, value]) => {
                  if (breakpointKeys.includes(breakpoint)) {
                    const containerQuery = theme.containerQueries[key](breakpoint);
                    containerStyles[containerQuery] = value;
                  } else {
                    containerStyles[breakpoint] = value;
                  }
                });
              }
            } else {

              if (typeof styles === 'object') {
                containerStyles[key] = getThemeValue(key, styles, theme, config);
              } else {
                containerStyles[key] = styles;
              }
            }
          });
          
          return { [prop]: containerStyles };
        }
      }
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
    const { sx, theme = {} } = props || {};

    if (!sx) {
      return null;
    }

    const config = theme.unstable_sxConfig ?? defaultSxConfig;

  
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
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
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
          } else {
            css = merge(css, getThemeValue(styleKey, value, theme, config));
          }
        }
      });

      return sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css));
    }

    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }

  return styleFunctionSx;
}

const styleFunctionSx = unstable_createStyleFunctionSx();

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
