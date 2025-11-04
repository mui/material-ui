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

export const propToStyleFunction: Record<string, any> = Object.keys(filterPropsMapping).reduce<Record<string, any>>(
  (acc, styleFnName) => {
    const filterProps = filterPropsMapping[styleFnName as keyof typeof filterPropsMapping];
    filterProps.forEach((propName: string) => {
      acc[propName] = styleFunctionMapping[styleFnName as keyof typeof styleFunctionMapping];
    });

    return acc;
  },
  {},
);

function getThemeValue(prop: string, value: any, theme: object): any {
  const inputProps = {
    [prop]: value,
    theme,
  };

  const styleFunction = propToStyleFunction[prop];
  return styleFunction ? styleFunction(inputProps) : { [prop]: value };
}

export default getThemeValue;
