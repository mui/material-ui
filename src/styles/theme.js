// @flow weak

import shadows from './shadows';
import transitions from './transitions';
import createTypography from './typography';
import createBreakpoints from './breakpoints';
import createComponents from './components';
import createPalette from './palette';
import zIndex from './zIndex';
import createMixins from './mixins';

export function createMuiTheme(config = {}) {
  const {
    palette = createPalette(),
    breakpoints = createBreakpoints(),
    mixins = createMixins(breakpoints),
    typography = createTypography(palette),
    ...more,
  } = config;

  const theme = {
    dir: 'ltr',
    palette,
    typography,
    shadows,
    transitions,
    mixins,
    breakpoints,
    zIndex,
    ...more,
  };

  theme.components = createComponents(theme);

  return theme;
}

export default createMuiTheme;
