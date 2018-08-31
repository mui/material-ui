/* eslint-disable import/prefer-default-export */
import createMuiTheme from '../styles/createMuiTheme';

export function withWarningsSetTo(options, showDeprecationWarnings) {
  return createMuiTheme({
    ...options,
    typography: {
      ...options.typography,
      suppressDeprecationWarnings: !showDeprecationWarnings,
    },
  });
}

export function withDisabledWarnings(options = {}) {
  return withWarningsSetTo(options, false);
}

export function withEnabledWarnings(options = {}) {
  return withWarningsSetTo(options, true);
}
