import {
  borders,
  display,
  flexbox,
  grid,
  positions,
  palette,
  shadows,
  sizing,
  spacing,
  typography,
  handleBreakpoints,
} from '@material-ui/system';
import { deepmerge } from '@material-ui/utils';

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}

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

const getThemeValue = (prop, value, theme) => {
  const inputProps = {
    [prop]: value,
    theme,
  };

  if (borders.filterProps.indexOf(prop) !== -1) {
    return borders(inputProps);
  }
  if (display.filterProps.indexOf(prop) !== -1) {
    return display(inputProps);
  }
  if (flexbox.filterProps.indexOf(prop) !== -1) {
    return flexbox(inputProps);
  }
  if (grid.filterProps.indexOf(prop) !== -1) {
    return grid(inputProps);
  }
  if (positions.filterProps.indexOf(prop) !== -1) {
    return positions(inputProps);
  }
  if (palette.filterProps.indexOf(prop) !== -1) {
    return palette(inputProps);
  }
  if (shadows.filterProps.indexOf(prop) !== -1) {
    return shadows(inputProps);
  }
  if (sizing.filterProps.indexOf(prop) !== -1) {
    return sizing(inputProps);
  }
  if (spacing.filterProps.indexOf(prop) !== -1) {
    return spacing(inputProps);
  }
  if (typography.filterProps.indexOf(prop) !== -1) {
    return typography(inputProps);
  }
  return { [prop]: value };
};

function createEmptyBreakpointObject(breakpoints) {
  const breakpointsInOrder = breakpoints.keys.reduce((acc, key) => {
    const breakpointStyleKey = breakpoints.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder;
}

function removeUnusedBreakpoints(breakpointKeys, style) {
  return breakpointKeys.reduce(
    (acc, key) => {
      const breakpointOutput = acc[key];
      const isBreakpointUnused = Object.keys(breakpointOutput).length === 0;
      if (isBreakpointUnused) {
        delete acc[key];
      }
      return acc;
    },
    { ...style },
  );
}

const mergeBreakpointsInOrder = (breakpoints, ...styles) => {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpoints);
  const mergedOutput = [emptyBreakpoints, ...styles].reduce(
    (prev, next) => deepmerge(prev, next),
    {},
  );
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
};

export const styleFunctionSx = (styles, theme) => {
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
          const transformedValue = styleFunctionSx(styles[styleKey], theme);
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

const styleFunction = (props) => {
  let result = {};
  Object.keys(props).forEach((prop) => {
    if (filterProps.indexOf(prop) !== -1 && prop !== 'sx') {
      result = deepmerge(result, getThemeValue(prop, props[prop], props.theme));
    }
  });

  const sxValue = styleFunctionSx(props.sx, props.theme);

  return mergeBreakpointsInOrder(props.theme.breakpoints, result, sxValue);
};

styleFunction.filterProps = filterProps;

export default styleFunction;
