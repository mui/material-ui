import { createGetColorSchemeSelector, prepareCssVars } from '@mui/system/cssVars';
import { unstable_applyStyles as applyStyles } from '@mui/system/createTheme';

export interface M3Colors {
  'sys-color-primary': string;
  'sys-color-surface-tint': string;
  'sys-color-on-primary': string;
  'sys-color-primary-container': string;
  'sys-color-on-primary-container': string;
  'sys-color-secondary': string;
  'sys-color-on-secondary': string;
  'sys-color-secondary-container': string;
  'sys-color-on-secondary-container': string;
  'sys-color-tertiary': string;
  'sys-color-on-tertiary': string;
  'sys-color-tertiary-container': string;
  'sys-color-on-tertiary-container': string;
  'sys-color-error': string;
  'sys-color-on-error': string;
  'sys-color-error-container': string;
  'sys-color-on-error-container': string;
  'sys-color-background': string;
  'sys-color-on-background': string;
  'sys-color-surface': string;
  'sys-color-on-surface': string;
  'sys-color-surface-variant': string;
  'sys-color-on-surface-variant': string;
  'sys-color-outline': string;
  'sys-color-outline-variant': string;
  'sys-color-shadow': string;
  'sys-color-scrim': string;
  'sys-color-inverse-surface': string;
  'sys-color-inverse-on-surface': string;
  'sys-color-inverse-primary': string;
  'sys-color-primary-fixed': string;
  'sys-color-on-primary-fixed': string;
  'sys-color-primary-fixed-dim': string;
  'sys-color-on-primary-fixed-variant': string;
  'sys-color-secondary-fixed': string;
  'sys-color-on-secondary-fixed': string;
  'sys-color-secondary-fixed-dim': string;
  'sys-color-on-secondary-fixed-variant': string;
  'sys-color-tertiary-fixed': string;
  'sys-color-on-tertiary-fixed': string;
  'sys-color-tertiary-fixed-dim': string;
  'sys-color-on-tertiary-fixed-variant': string;
  'sys-color-surface-dim': string;
  'sys-color-surface-bright': string;
  'sys-color-surface-container-lowest': string;
  'sys-color-surface-container-low': string;
  'sys-color-surface-container': string;
  'sys-color-surface-container-high': string;
  'sys-color-surface-container-highest': string;
}

export interface ThemeM3 {
  vars: M3Colors;
}

export function createM3Theme(options: any = {}): ThemeM3 {
  const {
    colorSchemes: colorSchemesInput = { light: true },
    defaultColorScheme: defaultColorSchemeInput,
    disableCssColorScheme = false,
    cssVarPrefix = 'md',
    colorSchemeSelector: selector = colorSchemesInput.light && colorSchemesInput.dark
      ? 'media'
      : undefined,
    ...input
  } = options;
  const firstColorScheme = Object.keys(colorSchemesInput)[0];
  const defaultColorScheme =
    defaultColorSchemeInput ||
    (colorSchemesInput.light && firstColorScheme !== 'light' ? 'light' : firstColorScheme);
  const {
    [defaultColorScheme]: defaultSchemeInput,
    light: builtInLight,
    dark: builtInDark,
    ...customColorSchemes
  } = colorSchemesInput;

  const defaultLight = {
    'sys-color-primary': 'rgb(101 85 143)',
    'sys-color-surface-tint': 'rgb(103 80 164)',
    'sys-color-on-primary': 'rgb(255 255 255)',
    'sys-color-primary-container': 'rgb(234 221 255)',
    'sys-color-on-primary-container': 'rgb(33 0 93)',
    'sys-color-secondary': 'rgb(98 91 113)',
    'sys-color-on-secondary': 'rgb(255 255 255)',
    'sys-color-secondary-container': 'rgb(232 222 248)',
    'sys-color-on-secondary-container': 'rgb(29 25 43)',
    'sys-color-tertiary': 'rgb(125 82 96)',
    'sys-color-on-tertiary': 'rgb(255 255 255)',
    'sys-color-tertiary-container': 'rgb(255 216 228)',
    'sys-color-on-tertiary-container': 'rgb(49 17 29)',
    'sys-color-error': 'rgb(179 38 30)',
    'sys-color-on-error': 'rgb(255 255 255)',
    'sys-color-error-container': 'rgb(249 222 220)',
    'sys-color-on-error-container': 'rgb(65 14 11)',
    'sys-color-background': 'rgb(254 247 255)',
    'sys-color-on-background': 'rgb(29 27 32)',
    'sys-color-surface': 'rgb(254 247 255)',
    'sys-color-on-surface': 'rgb(29 27 32)',
    'sys-color-surface-variant': 'rgb(231 224 236)',
    'sys-color-on-surface-variant': 'rgb(73 69 79)',
    'sys-color-outline': 'rgb(121 116 126)',
    'sys-color-outline-variant': 'rgb(202 196 208)',
    'sys-color-shadow': 'rgb(0 0 0)',
    'sys-color-scrim': 'rgb(0 0 0)',
    'sys-color-inverse-surface': 'rgb(50 47 53)',
    'sys-color-inverse-on-surface': 'rgb(245 239 247)',
    'sys-color-inverse-primary': 'rgb(208 188 255)',
    'sys-color-primary-fixed': 'rgb(234 221 255)',
    'sys-color-on-primary-fixed': 'rgb(33 0 93)',
    'sys-color-primary-fixed-dim': 'rgb(208 188 255)',
    'sys-color-on-primary-fixed-variant': 'rgb(79 55 139)',
    'sys-color-secondary-fixed': 'rgb(232 222 248)',
    'sys-color-on-secondary-fixed': 'rgb(29 25 43)',
    'sys-color-secondary-fixed-dim': 'rgb(204 194 220)',
    'sys-color-on-secondary-fixed-variant': 'rgb(74 68 88)',
    'sys-color-tertiary-fixed': 'rgb(255 216 228)',
    'sys-color-on-tertiary-fixed': 'rgb(49 17 29)',
    'sys-color-tertiary-fixed-dim': 'rgb(239 184 200)',
    'sys-color-on-tertiary-fixed-variant': 'rgb(99 59 72)',
    'sys-color-surface-dim': 'rgb(222 216 225)',
    'sys-color-surface-bright': 'rgb(254 247 255)',
    'sys-color-surface-container-lowest': 'rgb(255 255 255)',
    'sys-color-surface-container-low': 'rgb(247 242 250)',
    'sys-color-surface-container': 'rgb(243 237 247)',
    'sys-color-surface-container-high': 'rgb(236 230 240)',
    'sys-color-surface-container-highest': 'rgb(230 224 233)',
  };
  const defaultDark = {
    'sys-color-primary': 'rgb(208 188 254)',
    'sys-color-surface-tint': 'rgb(208 188 255)',
    'sys-color-on-primary': 'rgb(56 30 114)',
    'sys-color-primary-container': 'rgb(79 55 139)',
    'sys-color-on-primary-container': 'rgb(234 221 255)',
    'sys-color-secondary': 'rgb(204 194 220)',
    'sys-color-on-secondary': 'rgb(51 45 65)',
    'sys-color-secondary-container': 'rgb(74 68 88)',
    'sys-color-on-secondary-container': 'rgb(232 222 248)',
    'sys-color-tertiary': 'rgb(239 184 200)',
    'sys-color-on-tertiary': 'rgb(73 37 50)',
    'sys-color-tertiary-container': 'rgb(99 59 72)',
    'sys-color-on-tertiary-container': 'rgb(255 216 228)',
    'sys-color-error': 'rgb(242 184 181)',
    'sys-color-on-error': 'rgb(96 20 16)',
    'sys-color-error-container': 'rgb(140 29 24)',
    'sys-color-on-error-container': 'rgb(249 222 220)',
    'sys-color-background': 'rgb(20 18 24)',
    'sys-color-on-background': 'rgb(230 224 233)',
    'sys-color-surface': 'rgb(20 18 24)',
    'sys-color-on-surface': 'rgb(230 224 233)',
    'sys-color-surface-variant': 'rgb(73 69 79)',
    'sys-color-on-surface-variant': 'rgb(202 196 208)',
    'sys-color-outline': 'rgb(147 143 153)',
    'sys-color-outline-variant': 'rgb(73 69 79)',
    'sys-color-shadow': 'rgb(0 0 0)',
    'sys-color-scrim': 'rgb(0 0 0)',
    'sys-color-inverse-surface': 'rgb(230 224 233)',
    'sys-color-inverse-on-surface': 'rgb(50 47 53)',
    'sys-color-inverse-primary': 'rgb(103 80 164)',
    'sys-color-primary-fixed': 'rgb(234 221 255)',
    'sys-color-on-primary-fixed': 'rgb(33 0 93)',
    'sys-color-primary-fixed-dim': 'rgb(208 188 255)',
    'sys-color-on-primary-fixed-variant': 'rgb(79 55 139)',
    'sys-color-secondary-fixed': 'rgb(232 222 248)',
    'sys-color-on-secondary-fixed': 'rgb(29 25 43)',
    'sys-color-secondary-fixed-dim': 'rgb(204 194 220)',
    'sys-color-on-secondary-fixed-variant': 'rgb(74 68 88)',
    'sys-color-tertiary-fixed': 'rgb(255 216 228)',
    'sys-color-on-tertiary-fixed': 'rgb(49 17 29)',
    'sys-color-tertiary-fixed-dim': 'rgb(239 184 200)',
    'sys-color-on-tertiary-fixed-variant': 'rgb(99 59 72)',
    'sys-color-surface-dim': 'rgb(20 18 24)',
    'sys-color-surface-bright': 'rgb(59 56 62)',
    'sys-color-surface-container-lowest': 'rgb(15 13 19)',
    'sys-color-surface-container-low': 'rgb(29 27 32)',
    'sys-color-surface-container': 'rgb(33 31 38)',
    'sys-color-surface-container-high': 'rgb(43 41 48)',
    'sys-color-surface-container-highest': 'rgb(54 52 59)',
  };
  const defaultTokens = {
    light: defaultLight,
    dark: defaultDark,
  };
  const colorSchemes = {
    [defaultColorScheme]: {
      ...defaultTokens[defaultColorScheme],
      ...defaultSchemeInput,
    },
    ...customColorSchemes,
  };
  if (builtInLight && !colorSchemes.light) {
    colorSchemes.light = defaultTokens.light;
  }
  if (builtInDark && !colorSchemes.dark) {
    colorSchemes.dark = defaultTokens.dark;
  }

  const theme = {
    ...input,
    defaultColorScheme,
    cssVarPrefix,
    colorSchemeSelector: selector,
    colorSchemes,
  };
  const parserConfig = {
    prefix: cssVarPrefix,
    disableCssColorScheme,
  };
  const { vars, generateThemeVars, generateStyleSheets } = prepareCssVars(theme, parserConfig);
  theme.vars = vars;
  theme.generateThemeVars = generateThemeVars;
  theme.generateStyleSheets = generateStyleSheets;
  theme.getColorSchemeSelector = createGetColorSchemeSelector(selector);
  theme.applyStyles = applyStyles;

  return theme;
}
