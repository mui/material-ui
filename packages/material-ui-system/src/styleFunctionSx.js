import getThemeValue from './getThemeValue';
import { handleBreakpoints } from './breakpoints';
import { deepmerge } from '@material-ui/utils';

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}

const styleFunctionSx = (props = {}) => {
  const { sx: styles, theme } = props;
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
    if (typeof styles[styleKey] === 'object') {
      if (filterProps.indexOf(styleKey) !== -1) {
        css = deepmerge(css, getThemeValue(styleKey, styles[styleKey], theme));
      } else {
        const breakpointsValues = handleBreakpoints({ theme }, styles[styleKey], (x) => ({
          [styleKey]: x,
        }));

        if (objectsHaveSameKeys(breakpointsValues, styles[styleKey])) {
          const transformedValue = styleFunctionSx({ sx: styles[styleKey], theme });
          css[styleKey] = transformedValue;
        } else {
          css = deepmerge(css, breakpointsValues);
        }
      }
    } else if (typeof styles[styleKey] === 'function') {
      css = deepmerge(css, { [styleKey]: styles[styleKey](theme) });
    } else {
      css = deepmerge(css, getThemeValue(styleKey, styles[styleKey], theme));
    }
  });

  return css;
};

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
