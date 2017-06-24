// @flow

import shadows from './shadows';
import transitions from './transitions';
import createTypography from './typography';
import createBreakpoints from './breakpoints';
import createPalette from './palette';
import zIndex from './zIndex';
import createMixins from './mixins';
import spacing from './spacing';

function createMuiTheme(options: Object = {}) {
  const {
    palette = createPalette(),
    breakpoints = createBreakpoints(),
    mixins = createMixins(breakpoints, spacing),
    typography = createTypography(palette),
    ...more
  } = options;

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
    ...more,
  };
}

export default createMuiTheme;
