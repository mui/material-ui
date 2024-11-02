import merge from '@mui/utils/fastDeepAssign';
import { getPath, getStyleValue2 } from '../style';
import {
  hasBreakpoint,
  iterateBreakpoints,
  createEmptyBreakpointObject,
  removeUnusedBreakpoints,
  DEFAULT_BREAKPOINTS,
} from '../breakpoints';
import { sortContainerQueries } from '../cssContainerQueries';
import defaultSxConfig from './defaultSxConfig';

/* eslint-disable guard-for-in */

const EMPTY_THEME = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export function unstable_createStyleFunctionSx() {
  function styleFunctionSx(props) {
    if (!props.sx) {
      return null;
    }

    const { sx, theme = EMPTY_THEME } = props;

    const config = theme.unstable_sxConfig ?? defaultSxConfig;

    // Pass argument without loop allocations
    const wrapper = { sx: null, theme };

    function process(sxInput) {
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

      const breakpoints = theme.breakpoints ?? DEFAULT_BREAKPOINTS;

      const css = createEmptyBreakpointObject(breakpoints);

      for (const styleKey in sxObject) {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value === null || value === undefined) {
          continue;
        }
        if (typeof value !== 'object') {
          setThemeValue(css, styleKey, value, theme, config);
          continue;
        }
        if (config[styleKey]) {
          setThemeValue(css, styleKey, value, theme, config);
          continue;
        }

        if (hasBreakpoint(breakpoints, value)) {
          iterateBreakpoints(css, props.theme, value, (_, mediaKey, finalValue) => {
            css[mediaKey][styleKey] = finalValue;
          });
        } else {
          wrapper.sx = value;
          css[styleKey] = styleFunctionSx(wrapper);
        }
      }

      return sortContainerQueries(theme, removeUnusedBreakpoints(breakpoints, css));
    }

    return Array.isArray(sx) ? sx.map(process) : process(sx);
  }

  styleFunctionSx.filterProps = ['sx'];

  return styleFunctionSx;
}

export default unstable_createStyleFunctionSx();

function setThemeValue(css, prop, value, theme, config) {
  const options = config[prop];

  if (!options) {
    css[prop] = value;
    return;
  }

  if (value == null) {
    return;
  }

  const { themeKey } = options;
  // TODO v6: remove, see https://github.com/mui/material-ui/pull/38123
  if (themeKey === 'typography' && value === 'inherit') {
    css[prop] = value;
    return;
  }

  const { style } = options;
  if (style) {
    merge(
      css,
      style({
        [prop]: value,
        theme,
      }),
    );
    return;
  }

  const { cssProperty = prop, transform } = options;
  const themeMapping = getPath(theme, themeKey);

  iterateBreakpoints(css, theme, value, (target, key, valueFinal) => {
    const finalValue = getStyleValue2(themeMapping, transform, valueFinal, prop);

    if (cssProperty === false) {
      if (key) {
        target[key] = finalValue;
      } else {
        merge(target, finalValue);
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (key) {
        target[key][cssProperty] = finalValue;
      } else {
        target[cssProperty] = finalValue;
      }
    }
  });
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}
