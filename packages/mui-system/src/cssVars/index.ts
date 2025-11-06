'use client';
export { default } from './createCssVarsProvider';
export type {
  CreateCssVarsProviderResult,
  CssVarsProviderConfig,
  ColorSchemeContextValue,
} from './createCssVarsProvider';

// TODO: remove this export in v6 in favor of InitColorSchemeScript
export { default as getInitColorSchemeScript } from './getInitColorSchemeScript';

export { default as prepareCssVars } from './prepareCssVars';
export { default as createCssVarsTheme } from './createCssVarsTheme';
