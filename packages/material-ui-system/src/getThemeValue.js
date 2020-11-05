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

function getThemeValue(prop, value, theme) {
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
}

export default getThemeValue;
