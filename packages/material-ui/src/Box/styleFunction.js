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
  mergeBreakpointsInOrder,
  unstable_styleFunctionSx as styleFunctionSx,
  unstable_getThemeValue as getThemeValue,
} from '@material-ui/system';
import { deepmerge } from '@material-ui/utils';

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
  ...styleFunctionSx.filterProps,
];

const styleFunction = (props) => {
  let result = {};
  Object.keys(props).forEach((prop) => {
    if (filterProps.indexOf(prop) !== -1 && prop !== 'sx') {
      result = deepmerge(result, getThemeValue(prop, props[prop], props.theme));
    }
  });
  return mergeBreakpointsInOrder(props.theme.breakpoints, result);
};

styleFunction.filterProps = filterProps;

export default styleFunction;
