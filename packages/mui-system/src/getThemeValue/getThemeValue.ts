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

const filterPropsMapping: Record<string, string[]> = {
  borders: borders.filterProps,
  display: display.filterProps,
  flexbox: flexbox.filterProps,
  grid: grid.filterProps,
  positions: positions.filterProps,
  palette: palette.filterProps,
  shadows: (shadows as any).filterProps,
  sizing: sizing.filterProps,
  spacing: Array.from((spacing as any).filterProps),
  typography: typography.filterProps,
};

export const styleFunctionMapping: Record<string, (props: any) => any> = {
  borders,
  display,
  flexbox,
  grid,
  positions,
  palette,
  shadows: shadows as any,
  sizing,
  spacing,
  typography,
};

export const propToStyleFunction: Record<string, (props: any) => any> = Object.keys(
  filterPropsMapping,
).reduce<Record<string, (props: any) => any>>((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach((propName) => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });

  return acc;
}, {});

function getThemeValue(prop: string, value: any, theme: object): any {
  const inputProps = {
    [prop]: value,
    theme,
  };

  const styleFunction = propToStyleFunction[prop];
  return styleFunction ? styleFunction(inputProps) : { [prop]: value };
}

export default getThemeValue;
