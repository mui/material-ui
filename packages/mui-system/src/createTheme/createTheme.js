import { deepmerge } from '@mui/utils';
import createBreakpoints from './createBreakpoints';
import shape from './shape';
import createSpacing from './createSpacing';
import styleFunctionSx from '../styleFunctionSx';

function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {},
    ...other
  } = options;

  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);

  let muiTheme = deepmerge(
    {
      breakpoints,
      direction: 'ltr',
      components: {}, // Inject component definitions.
      palette: { mode: 'light', ...paletteInput },
      spacing,
      shape: { ...shape, ...shapeInput },
      sx(styles) {
        return styleFunctionSx({ sx: styles, theme: this });
      },
    },
    other,
  );

  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);

  return muiTheme;
}

export default createTheme;
