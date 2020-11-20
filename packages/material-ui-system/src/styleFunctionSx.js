import { deepmerge } from '@material-ui/utils';
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

function processStyleFunctionSx(props) {
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

  return mergeBreakpointsInOrder(theme.breakpoints, css);
}

function convertStringSxToObject(sx) {
  return sx.split(' ').reduce((acc, item) => {
    const split = item.split(':');
    if (split.length === 3) {
      const [breakpoint, property, value] = split;
      if (typeof acc[property] === 'string') {
        acc[property] = {
          [breakpoint]: !isNaN(value) ? Number(value) : value,
        };
      } else if (typeof acc[property] === 'object') {
        acc[property] = {
          ...acc[property],
          [breakpoint]: !isNaN(value) ? Number(value) : value,
        };
      } else {
        acc[property] = {
          [breakpoint]: !isNaN(value) ? Number(value) : value,
        };
      }
    } else if (split.length === 2) {
      const [property, value] = split;
      acc[property] = !isNaN(value) ? Number(value) : value;
    } else {
      const [property] = split;
      acc[property] = true;
    }
    return acc;
  }, {});
}

function styleFunctionSx(props) {
  const processedSx = typeof props.sx === 'string' ? convertStringSxToObject(props.sx) : props.sx;
  return processStyleFunctionSx({ ...props, sx: processedSx });
}

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
