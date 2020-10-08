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
  ...spacing.filterProps,
  ...typography.filterProps,
  'sx',
];

const getThemeValue = (prop, value, theme) => {
  const inputProps = {
    [prop]: value,
    theme,
  };

  if(borders.filterProps.indexOf(prop) !== -1) {
    return borders(inputProps);
  }
  if(display.filterProps.indexOf(prop) !== -1) {
    return display(inputProps);
  }
  if(flexbox.filterProps.indexOf(prop) !== -1) {
    return flexbox(inputProps);
  }
  if(grid.filterProps.indexOf(prop) !== -1) {
    return grid(inputProps);
  }
  if(positions.filterProps.indexOf(prop) !== -1) {
    return positions(inputProps);
  }
  if(palette.filterProps.indexOf(prop) !== -1) {
    return palette(inputProps);
  }
  if(shadows.filterProps.indexOf(prop) !== -1) {
    return shadows(inputProps);
  }
  if(sizing.filterProps.indexOf(prop) !== -1) {
    return sizing(inputProps);
  }
  if(spacing.filterProps.indexOf(prop) !== -1) {
    return spacing(inputProps);
  }
  if(typography.filterProps.indexOf(prop) !== -1) {
    return typography(inputProps);
  }
  return { [prop]: value };
};

const traverseSx = (styles, theme) => {
  if(!styles)
    return null;

  if(typeof styles !== 'object') {
    // value
    return styles;
  }

  let css = {};

  Object.keys(styles).forEach(styleKey => {
    if(typeof styles[styleKey] === 'object') {
      if(filterProps.indexOf(styleKey) !== -1) {
        css = {
          ...css,
          ...getThemeValue(styleKey, value, theme)
        }
      } else {
        const transformedValue = traverseSx(styles[styleKey], theme);
        css[styleKey] = transformedValue;
      }
    } else {
      const value = styles[styleKey];
      css = {
        ...css,
        ...getThemeValue(styleKey, value, theme)
      };
    }
  });

  return css;
}

const styleFunctionInversed = props => {
  let result = {};
  Object.keys(props).forEach(prop => {
    if(filterProps.indexOf(prop) !== -1) {
      result = {
        ...result,
        ...getThemeValue(prop, props[prop], props.theme)
      }
    }
  });

  let sxValue = traverseSx(props.sx, props.theme);

  return {
    ...result,
    ...sxValue,
  };
}

styleFunctionInversed.filterProps = filterProps;

export default styleFunctionInversed;