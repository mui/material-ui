import { deepmerge } from '@material-ui/utils';
import createBreakpoints from './createBreakpoints';
import createMixins from './createMixins';
import shadows from './shadows';
import shape from './shape';
import createSpacing from './createSpacing';
import createTransitions from './createTransitions';

function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    transitions: transitionsInput = {},
    shape: shapeInput = {},
    ...other
  } = options;

  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);

  let muiTheme = deepmerge(
    {
      breakpoints,
      direction: 'ltr',
      mixins: createMixins(breakpoints, spacing, mixinsInput),
      components: {}, // Inject component definitions.
      palette: { mode: 'light', ...paletteInput },
      // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
      shadows: shadows.slice(),
      spacing,
      shape: { ...shape, shapeInput },
      transitions: createTransitions(transitionsInput),
    },
    other,
  );

  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);

  return muiTheme;
}

export default createTheme;
