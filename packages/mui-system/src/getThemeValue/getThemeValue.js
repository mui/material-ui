import borders from '../borders';
import display from '../display';
import flexbox from '../flexbox';
import grid from '../cssGrid';
import positions from '../positions';
import palette from '../palette';
import shadows from '../shadows';
import sizing from '../sizing';
import spacing from '../spacing';
import typography from '../typography';

const filterPropsMapping = {
  borders: borders.filterProps,
  display: display.filterProps,
  flexbox: flexbox.filterProps,
  grid: grid.filterProps,
  positions: positions.filterProps,
  palette: palette.filterProps,
  shadows: shadows.filterProps,
  sizing: sizing.filterProps,
  spacing: spacing.filterProps,
  typography: typography.filterProps,
};

export const styleFunctionMapping = {
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
};

export const propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach((propName) => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });

  return acc;
}, {});

function getThemeValue(prop, value, theme) {
  const inputProps = {
    [prop]: value,
    theme,
  };

  const styleFunction = propToStyleFunction[prop];
  return styleFunction ? styleFunction(inputProps) : { [prop]: value };
}

export default getThemeValue;
