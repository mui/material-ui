// @flow

import shadows from './shadows';
import transitions from './transitions';
import createTypography from './createTypography';
import createBreakpoints from './createBreakpoints';
import createPalette from './createPalette';
import createMixins from './createMixins';
import zIndex from './zIndex';
import spacing from './spacing';

function createMuiTheme(options: Object = {}) {
  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    typography: typographyInput = {},
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);
  const mixins = createMixins(breakpoints, spacing, mixinsInput);
  const typography = createTypography(palette, typographyInput);

  return {
    direction: 'ltr',
    palette,
    typography,
    shadows,
    transitions,
    mixins,
    spacing,
    breakpoints,
    zIndex,
    ...other,
  };
}

export default createMuiTheme;
