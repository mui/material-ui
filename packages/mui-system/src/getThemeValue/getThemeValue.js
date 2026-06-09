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

export const propToStyleFunction = Object.keys(styleFunctionMapping).reduce((acc, styleFnName) => {
  styleFunctionMapping[styleFnName].filterProps.forEach((propName) => {
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
