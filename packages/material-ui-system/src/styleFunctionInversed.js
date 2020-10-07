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

const styleFunctionInversed = props => {
  let result = {};
  Object.keys(props).forEach(prop => {
    const inputProps = {
      [prop]: props[prop],
      theme: props.theme,
    };

    if(borders.filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...borders(inputProps),
      }   
    }
    if(display.filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...display(inputProps),
      }
    }
    if(flexbox.filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...flexbox(inputProps),
      }
    }
    if(grid.filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...grid(inputProps),
      }
    }
    if(positions.filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...positions(inputProps),
      }
    }
    if(palette.filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...palette(inputProps),
      }
    }
    if(shadows.filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...shadows(inputProps),
      }
    }
    if(sizing.filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...sizing(inputProps),
      }
    }
    if(spacing.filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...spacing(inputProps),
      }
    }
    if(typography.filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...typography(inputProps),
      }
    }
  });
  return result;
}

export default styleFunctionInversed;