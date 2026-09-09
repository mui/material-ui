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

type StyleFunctionWithFilterProps = ((props: any) => any) & { filterProps: Iterable<string> };

/** @internal */
export const styleFunctionMapping: Record<string, StyleFunctionWithFilterProps> = {
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

/** @internal */
export const propToStyleFunction: Record<string, (props: any) => any> = Object.keys(
  styleFunctionMapping,
).reduce<Record<string, (props: any) => any>>((acc, styleFnName) => {
  for (const propName of styleFunctionMapping[styleFnName].filterProps) {
    acc[propName] = styleFunctionMapping[styleFnName];
  }

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
