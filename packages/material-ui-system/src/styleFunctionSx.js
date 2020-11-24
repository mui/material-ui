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
  const objectsKeysLength = [];

  const allKeys = objects.reduce((keys, object) => {
    const objectKeys = Object.keys(object);

    objectsKeysLength.push(objectKeys.length);
    return keys.concat(objectKeys);
  }, []);

  const union = new Set(allKeys);

  return objectsKeysLength.every((objectLength) => union.size === objectLength);
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
    if (typeof styles[styleKey] === 'object') {
      if (filterProps.indexOf(styleKey) !== -1) {
        // breakpoints, need deepmerge
        css = deepmerge(css, getThemeValue(styleKey, styles[styleKey], theme));
      } else {
        const breakpointsValues = handleBreakpoints({ theme }, styles[styleKey], (x) => ({
          [styleKey]: x,
        }));

        if (objectsHaveSameKeys(breakpointsValues, styles[styleKey])) {
          css[styleKey] = styleFunctionSx({ sx: styles[styleKey], theme });
        } else {
          // breakpoints for regular CSS values, need deep merge
          css = deepmerge(css, breakpointsValues);
        }
      }
    } else if (typeof styles[styleKey] === 'function') {
      css = deepmerge(css, { [styleKey]: styles[styleKey](theme) });
    } else {
      // simple value no need for deepmerge
      const result = getThemeValue(styleKey, styles[styleKey], theme);
      Object.keys(result).forEach((key) => {
        css[key] = result[key];
      });
    }
  });

  return mergeBreakpointsInOrder(theme.breakpoints, css);
}

styleFunctionSx.filterProps = ['sx'];

export default styleFunctionSx;
