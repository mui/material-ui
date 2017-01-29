// @flow weak

import shadows from './shadows';
import transitions from './transitions';
import createTypography from './typography';
import createBreakpoints from './breakpoints';
import createPalette from './palette';
import zIndex from './zIndex';
import createMixins from './mixins';
import spacing from './spacing';

export function createMuiTheme(config = {}) {
  const {
    palette = createPalette(),
    breakpoints = createBreakpoints(),
    mixins = createMixins(breakpoints, spacing),
    typography = createTypography(palette),
    ...more
  } = config;

  const theme = {
    dir: 'ltr',
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

  return theme;
}

export default createMuiTheme;
