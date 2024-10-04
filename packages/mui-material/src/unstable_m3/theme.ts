import { createGetColorSchemeSelector, prepareCssVars } from '@mui/system/cssVars';
import { unstable_applyStyles as applyStyles } from '@mui/system/createTheme';

function shouldSkipGeneratingVar(keys: string[]) {
  return (
    !!keys[0].match(
      /(cssVarPrefix|colorSchemeSelector|rootSelector|typography|breakpoints|transitions)/,
    ) || !!keys[0].match(/sxConfig$/) // ends with sxConfig
  );
}

export interface ThemeRefTokens {
  'ref-typeface-brand': string;
  'ref-typeface-plain': string;
  'ref-typeface-weight-medium': string;
  'ref-typeface-weight-regular': string;
}

interface ThemeSysTokens {
  'color-primary': string;
  'color-surface-tint': string;
  'color-on-primary': string;
  'color-primary-container': string;
  'color-on-primary-container': string;
  'color-secondary': string;
  'color-on-secondary': string;
  'color-secondary-container': string;
  'color-on-secondary-container': string;
  'color-tertiary': string;
  'color-on-tertiary': string;
  'color-tertiary-container': string;
  'color-on-tertiary-container': string;
  'color-error': string;
  'color-on-error': string;
  'color-error-container': string;
  'color-on-error-container': string;
  'color-background': string;
  'color-on-background': string;
  'color-surface': string;
  'color-on-surface': string;
  'color-surface-variant': string;
  'color-on-surface-variant': string;
  'color-outline': string;
  'color-outline-variant': string;
  'color-shadow': string;
  'color-scrim': string;
  'color-inverse-surface': string;
  'color-inverse-on-surface': string;
  'color-inverse-primary': string;
  'color-primary-fixed': string;
  'color-on-primary-fixed': string;
  'color-primary-fixed-dim': string;
  'color-on-primary-fixed-variant': string;
  'color-secondary-fixed': string;
  'color-on-secondary-fixed': string;
  'color-secondary-fixed-dim': string;
  'color-on-secondary-fixed-variant': string;
  'color-tertiary-fixed': string;
  'color-on-tertiary-fixed': string;
  'color-tertiary-fixed-dim': string;
  'color-on-tertiary-fixed-variant': string;
  'color-surface-dim': string;
  'color-surface-bright': string;
  'color-surface-container-lowest': string;
  'color-surface-container-low': string;
  'color-surface-container': string;
  'color-surface-container-high': string;
  'color-surface-container-highest': string;
  'typescale-display-large-font': string;
  'typescale-display-large-weight': string;
  'typescale-display-large-size': string;
  'typescale-display-large-tracking': string;
  'typescale-display-large-line-height': string;
  'typescale-display-medium-font': string;
  'typescale-display-medium-weight': string;
  'typescale-display-medium-size': string;
  'typescale-display-medium-tracking': string;
  'typescale-display-medium-line-height': string;
  'typescale-display-small-font': string;
  'typescale-display-small-weight': string;
  'typescale-display-small-size': string;
  'typescale-display-small-tracking': string;
  'typescale-display-small-line-height': string;
  'typescale-headline-large-font': string;
  'typescale-headline-large-weight': string;
  'typescale-headline-large-size': string;
  'typescale-headline-large-tracking': string;
  'typescale-headline-large-line-height': string;
  'typescale-headline-medium-font': string;
  'typescale-headline-medium-weight': string;
  'typescale-headline-medium-size': string;
  'typescale-headline-medium-tracking': string;
  'typescale-headline-medium-line-height': string;
  'typescale-headline-small-font': string;
  'typescale-headline-small-weight': string;
  'typescale-headline-small-size': string;
  'typescale-headline-small-tracking': string;
  'typescale-headline-small-line-height': string;
  'typescale-title-large-font': string;
  'typescale-title-large-weight': string;
  'typescale-title-large-size': string;
  'typescale-title-large-tracking': string;
  'typescale-title-large-line-height': string;
  'typescale-title-medium-font': string;
  'typescale-title-medium-weight': string;
  'typescale-title-medium-size': string;
  'typescale-title-medium-tracking': string;
  'typescale-title-medium-line-height': string;
  'typescale-title-small-font': string;
  'typescale-title-small-weight': string;
  'typescale-title-small-size': string;
  'typescale-title-small-tracking': string;
  'typescale-title-small-line-height': string;
  'typescale-body-large-font': string;
  'typescale-body-large-weight': string;
  'typescale-body-large-size': string;
  'typescale-body-large-tracking': string;
  'typescale-body-large-line-height': string;
  'typescale-body-medium-font': string;
  'typescale-body-medium-weight': string;
  'typescale-body-medium-size': string;
  'typescale-body-medium-tracking': string;
  'typescale-body-medium-line-height': string;
  'typescale-body-small-font': string;
  'typescale-body-small-weight': string;
  'typescale-body-small-size': string;
  'typescale-body-small-tracking': string;
  'typescale-body-small-line-height': string;
  'typescale-label-large-font': string;
  'typescale-label-large-weight': string;
  'typescale-label-large-size': string;
  'typescale-label-large-tracking': string;
  'typescale-label-large-line-height': string;
  'typescale-label-medium-font': string;
  'typescale-label-medium-weight': string;
  'typescale-label-medium-size': string;
  'typescale-label-medium-tracking': string;
  'typescale-label-medium-line-height': string;
  'typescale-label-small-font': string;
  'typescale-label-small-weight': string;
  'typescale-label-small-size': string;
  'typescale-label-small-tracking': string;
  'typescale-label-small-line-height': string;
  'shape-corner-full': string;
  'shape-corner-extra-large-top': string;
  'shape-corner-extra-large': string;
  'shape-corner-large-top': string;
  'shape-corner-large-end': string;
  'shape-corner-large-start': string;
  'shape-corner-large': string;
  'shape-corner-medium': string;
  'shape-corner-small': string;
  'shape-corner-extra-small-top': string;
  'shape-corner-extra-small': string;
  'shape-corner-none': string;
}

export interface ThemeM3 {
  vars: { sys: ThemeSysTokens; ref: ThemeRefTokens };
  typography: Record<
    | 'display-large'
    | 'display-medium'
    | 'display-small'
    | 'headline-large'
    | 'headline-medium'
    | 'headline-small'
    | 'title-large'
    | 'title-medium'
    | 'title-small'
    | 'body-large'
    | 'body-medium'
    | 'body-small'
    | 'label-large'
    | 'label-medium'
    | 'label-small',
    React.CSSProperties
  >;
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
    sys: {
      'color-primary': 'rgb(101 85 143)',
      'color-surface-tint': 'rgb(103 80 164)',
      'color-on-primary': 'rgb(255 255 255)',
      'color-primary-container': 'rgb(234 221 255)',
      'color-on-primary-container': 'rgb(33 0 93)',
      'color-secondary': 'rgb(98 91 113)',
      'color-on-secondary': 'rgb(255 255 255)',
      'color-secondary-container': 'rgb(232 222 248)',
      'color-on-secondary-container': 'rgb(29 25 43)',
      'color-tertiary': 'rgb(125 82 96)',
      'color-on-tertiary': 'rgb(255 255 255)',
      'color-tertiary-container': 'rgb(255 216 228)',
      'color-on-tertiary-container': 'rgb(49 17 29)',
      'color-error': 'rgb(179 38 30)',
      'color-on-error': 'rgb(255 255 255)',
      'color-error-container': 'rgb(249 222 220)',
      'color-on-error-container': 'rgb(65 14 11)',
      'color-background': 'rgb(254 247 255)',
      'color-on-background': 'rgb(29 27 32)',
      'color-surface': 'rgb(254 247 255)',
      'color-on-surface': 'rgb(29 27 32)',
      'color-surface-variant': 'rgb(231 224 236)',
      'color-on-surface-variant': 'rgb(73 69 79)',
      'color-outline': 'rgb(121 116 126)',
      'color-outline-variant': 'rgb(202 196 208)',
      'color-shadow': 'rgb(0 0 0)',
      'color-scrim': 'rgb(0 0 0)',
      'color-inverse-surface': 'rgb(50 47 53)',
      'color-inverse-on-surface': 'rgb(245 239 247)',
      'color-inverse-primary': 'rgb(208 188 255)',
      'color-primary-fixed': 'rgb(234 221 255)',
      'color-on-primary-fixed': 'rgb(33 0 93)',
      'color-primary-fixed-dim': 'rgb(208 188 255)',
      'color-on-primary-fixed-variant': 'rgb(79 55 139)',
      'color-secondary-fixed': 'rgb(232 222 248)',
      'color-on-secondary-fixed': 'rgb(29 25 43)',
      'color-secondary-fixed-dim': 'rgb(204 194 220)',
      'color-on-secondary-fixed-variant': 'rgb(74 68 88)',
      'color-tertiary-fixed': 'rgb(255 216 228)',
      'color-on-tertiary-fixed': 'rgb(49 17 29)',
      'color-tertiary-fixed-dim': 'rgb(239 184 200)',
      'color-on-tertiary-fixed-variant': 'rgb(99 59 72)',
      'color-surface-dim': 'rgb(222 216 225)',
      'color-surface-bright': 'rgb(254 247 255)',
      'color-surface-container-lowest': 'rgb(255 255 255)',
      'color-surface-container-low': 'rgb(247 242 250)',
      'color-surface-container': 'rgb(243 237 247)',
      'color-surface-container-high': 'rgb(236 230 240)',
      'color-surface-container-highest': 'rgb(230 224 233)',
    },
  };
  const defaultDark = {
    sys: {
      'color-primary': 'rgb(208 188 254)',
      'color-surface-tint': 'rgb(208 188 255)',
      'color-on-primary': 'rgb(56 30 114)',
      'color-primary-container': 'rgb(79 55 139)',
      'color-on-primary-container': 'rgb(234 221 255)',
      'color-secondary': 'rgb(204 194 220)',
      'color-on-secondary': 'rgb(51 45 65)',
      'color-secondary-container': 'rgb(74 68 88)',
      'color-on-secondary-container': 'rgb(232 222 248)',
      'color-tertiary': 'rgb(239 184 200)',
      'color-on-tertiary': 'rgb(73 37 50)',
      'color-tertiary-container': 'rgb(99 59 72)',
      'color-on-tertiary-container': 'rgb(255 216 228)',
      'color-error': 'rgb(242 184 181)',
      'color-on-error': 'rgb(96 20 16)',
      'color-error-container': 'rgb(140 29 24)',
      'color-on-error-container': 'rgb(249 222 220)',
      'color-background': 'rgb(20 18 24)',
      'color-on-background': 'rgb(230 224 233)',
      'color-surface': 'rgb(20 18 24)',
      'color-on-surface': 'rgb(230 224 233)',
      'color-surface-variant': 'rgb(73 69 79)',
      'color-on-surface-variant': 'rgb(202 196 208)',
      'color-outline': 'rgb(147 143 153)',
      'color-outline-variant': 'rgb(73 69 79)',
      'color-shadow': 'rgb(0 0 0)',
      'color-scrim': 'rgb(0 0 0)',
      'color-inverse-surface': 'rgb(230 224 233)',
      'color-inverse-on-surface': 'rgb(50 47 53)',
      'color-inverse-primary': 'rgb(103 80 164)',
      'color-primary-fixed': 'rgb(234 221 255)',
      'color-on-primary-fixed': 'rgb(33 0 93)',
      'color-primary-fixed-dim': 'rgb(208 188 255)',
      'color-on-primary-fixed-variant': 'rgb(79 55 139)',
      'color-secondary-fixed': 'rgb(232 222 248)',
      'color-on-secondary-fixed': 'rgb(29 25 43)',
      'color-secondary-fixed-dim': 'rgb(204 194 220)',
      'color-on-secondary-fixed-variant': 'rgb(74 68 88)',
      'color-tertiary-fixed': 'rgb(255 216 228)',
      'color-on-tertiary-fixed': 'rgb(49 17 29)',
      'color-tertiary-fixed-dim': 'rgb(239 184 200)',
      'color-on-tertiary-fixed-variant': 'rgb(99 59 72)',
      'color-surface-dim': 'rgb(20 18 24)',
      'color-surface-bright': 'rgb(59 56 62)',
      'color-surface-container-lowest': 'rgb(15 13 19)',
      'color-surface-container-low': 'rgb(29 27 32)',
      'color-surface-container': 'rgb(33 31 38)',
      'color-surface-container-high': 'rgb(43 41 48)',
      'color-surface-container-highest': 'rgb(54 52 59)',
    },
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
    typography: {
      'display-large': {
        fontFamily: 'var(--md-sys-typescale-display-large-font)',
        fontWeight: 'var(--md-sys-typescale-display-large-weight)',
        fontSize: 'var(--md-sys-typescale-display-large-size)',
        letterSpacing: 'var(--md-sys-typescale-display-large-tracking)',
        lineHeight: 'var(--md-sys-typescale-display-large-line-height)',
      },
      'display-medium': {
        fontFamily: 'var(--md-sys-typescale-display-medium-font)',
        fontWeight: 'var(--md-sys-typescale-display-medium-weight)',
        fontSize: 'var(--md-sys-typescale-display-medium-size)',
        letterSpacing: 'var(--md-sys-typescale-display-medium-tracking)',
        lineHeight: 'var(--md-sys-typescale-display-medium-line-height)',
      },
      'display-small': {
        fontFamily: 'var(--md-sys-typescale-display-small-font)',
        fontWeight: 'var(--md-sys-typescale-display-small-weight)',
        fontSize: 'var(--md-sys-typescale-display-small-size)',
        letterSpacing: 'var(--md-sys-typescale-display-small-tracking)',
        lineHeight: 'var(--md-sys-typescale-display-small-line-height)',
      },
      'headline-large': {
        fontFamily: 'var(--md-sys-typescale-headline-large-font)',
        fontWeight: 'var(--md-sys-typescale-headline-large-weight)',
        fontSize: 'var(--md-sys-typescale-headline-large-size)',
        letterSpacing: 'var(--md-sys-typescale-headline-large-tracking)',
        lineHeight: 'var(--md-sys-typescale-headline-large-line-height)',
      },
      'headline-medium': {
        fontFamily: 'var(--md-sys-typescale-headline-medium-font)',
        fontWeight: 'var(--md-sys-typescale-headline-medium-weight)',
        fontSize: 'var(--md-sys-typescale-headline-medium-size)',
        letterSpacing: 'var(--md-sys-typescale-headline-medium-tracking)',
        lineHeight: 'var(--md-sys-typescale-headline-medium-line-height)',
      },
      'headline-small': {
        fontFamily: 'var(--md-sys-typescale-headline-small-font)',
        fontWeight: 'var(--md-sys-typescale-headline-small-weight)',
        fontSize: 'var(--md-sys-typescale-headline-small-size)',
        letterSpacing: 'var(--md-sys-typescale-headline-small-tracking)',
        lineHeight: 'var(--md-sys-typescale-headline-small-line-height)',
      },
      'title-large': {
        fontFamily: 'var(--md-sys-typescale-title-large-font)',
        fontWeight: 'var(--md-sys-typescale-title-large-weight)',
        fontSize: 'var(--md-sys-typescale-title-large-size)',
        letterSpacing: 'var(--md-sys-typescale-title-large-tracking)',
        lineHeight: 'var(--md-sys-typescale-title-large-line-height)',
      },
      'title-medium': {
        fontFamily: 'var(--md-sys-typescale-title-medium-font)',
        fontWeight: 'var(--md-sys-typescale-title-medium-weight)',
        fontSize: 'var(--md-sys-typescale-title-medium-size)',
        letterSpacing: 'var(--md-sys-typescale-title-medium-tracking)',
        lineHeight: 'var(--md-sys-typescale-title-medium-line-height)',
      },
      'title-small': {
        fontFamily: 'var(--md-sys-typescale-title-small-font)',
        fontWeight: 'var(--md-sys-typescale-title-small-weight)',
        fontSize: 'var(--md-sys-typescale-title-small-size)',
        letterSpacing: 'var(--md-sys-typescale-title-small-tracking)',
        lineHeight: 'var(--md-sys-typescale-title-small-line-height)',
      },
      'body-large': {
        fontFamily: 'var(--md-sys-typescale-body-large-font)',
        fontWeight: 'var(--md-sys-typescale-body-large-weight)',
        fontSize: 'var(--md-sys-typescale-body-large-size)',
        letterSpacing: 'var(--md-sys-typescale-body-large-tracking)',
        lineHeight: 'var(--md-sys-typescale-body-large-line-height)',
      },
      'body-medium': {
        fontFamily: 'var(--md-sys-typescale-body-medium-font)',
        fontWeight: 'var(--md-sys-typescale-body-medium-weight)',
        fontSize: 'var(--md-sys-typescale-body-medium-size)',
        letterSpacing: 'var(--md-sys-typescale-body-medium-tracking)',
        lineHeight: 'var(--md-sys-typescale-body-medium-line-height)',
      },
      'body-small': {
        fontFamily: 'var(--md-sys-typescale-body-small-font)',
        fontWeight: 'var(--md-sys-typescale-body-small-weight)',
        fontSize: 'var(--md-sys-typescale-body-small-size)',
        letterSpacing: 'var(--md-sys-typescale-body-small-tracking)',
        lineHeight: 'var(--md-sys-typescale-body-small-line-height)',
      },
      'label-large': {
        fontFamily: 'var(--md-sys-typescale-label-large-font)',
        fontWeight: 'var(--md-sys-typescale-label-large-weight)',
        fontSize: 'var(--md-sys-typescale-label-large-size)',
        letterSpacing: 'var(--md-sys-typescale-label-large-tracking)',
        lineHeight: 'var(--md-sys-typescale-label-large-line-height)',
      },
      'label-medium': {
        fontFamily: 'var(--md-sys-typescale-label-medium-font)',
        fontWeight: 'var(--md-sys-typescale-label-medium-weight)',
        fontSize: 'var(--md-sys-typescale-label-medium-size)',
        letterSpacing: 'var(--md-sys-typescale-label-medium-tracking)',
        lineHeight: 'var(--md-sys-typescale-label-medium-line-height)',
      },
      'label-small': {
        fontFamily: 'var(--md-sys-typescale-label-small-font)',
        fontWeight: 'var(--md-sys-typescale-label-small-weight)',
        fontSize: 'var(--md-sys-typescale-label-small-size)',
        letterSpacing: 'var(--md-sys-typescale-label-small-tracking)',
        lineHeight: 'var(--md-sys-typescale-label-small-line-height)',
      },
    },
    sys: {
      'typescale-display-large-font': 'var(--md-ref-typeface-brand)',
      'typescale-display-large-weight': 'var(--md-ref-typeface-weight-regular)',
      'typescale-display-large-size': '57px',
      'typescale-display-large-tracking': '-0.25px',
      'typescale-display-large-line-height': '64px',
      'typescale-display-medium-font': 'var(--md-ref-typeface-brand)',
      'typescale-display-medium-weight': 'var(--md-ref-typeface-weight-regular)',
      'typescale-display-medium-size': '45px',
      'typescale-display-medium-tracking': 0,
      'typescale-display-medium-line-height': '52px',
      'typescale-display-small-font': 'var(--md-ref-typeface-brand)',
      'typescale-display-small-weight': 'var(--md-ref-typeface-weight-regular)',
      'typescale-display-small-size': '36px',
      'typescale-display-small-tracking': 0,
      'typescale-display-small-line-height': '44px',
      'typescale-headline-large-font': 'var(--md-ref-typeface-brand)',
      'typescale-headline-large-weight': 'var(--md-ref-typeface-weight-regular)',
      'typescale-headline-large-size': '32px',
      'typescale-headline-large-tracking': 0,
      'typescale-headline-large-line-height': '40px',
      'typescale-headline-medium-font': 'var(--md-ref-typeface-brand)',
      'typescale-headline-medium-weight': 'var(--md-ref-typeface-weight-regular)',
      'typescale-headline-medium-size': '28px',
      'typescale-headline-medium-tracking': 0,
      'typescale-headline-medium-line-height': '36px',
      'typescale-headline-small-font': 'var(--md-ref-typeface-brand)',
      'typescale-headline-small-weight': 'var(--md-ref-typeface-weight-regular)',
      'typescale-headline-small-size': '24px',
      'typescale-headline-small-tracking': 0,
      'typescale-headline-small-line-height': '32px',
      'typescale-title-large-font': 'var(--md-ref-typeface-brand)',
      'typescale-title-large-weight': 'var(--md-ref-typeface-weight-regular)',
      'typescale-title-large-size': '22px',
      'typescale-title-large-tracking': 0,
      'typescale-title-large-line-height': '28px',
      'typescale-title-medium-font': 'var(--md-ref-typeface-plain)',
      'typescale-title-medium-weight': 'var(--md-ref-typeface-weight-medium)',
      'typescale-title-medium-size': '26px',
      'typescale-title-medium-tracking': '0.15px',
      'typescale-title-medium-line-height': '24px',
      'typescale-title-small-font': 'var(--md-ref-typeface-plain)',
      'typescale-title-small-weight': 'var(--md-ref-typeface-weight-medium)',
      'typescale-title-small-size': '14px',
      'typescale-title-small-tracking': '0.1px',
      'typescale-title-small-line-height': '20px',
      'typescale-body-large-font': 'var(--md-ref-typeface-plain)',
      'typescale-body-large-weight': 'var(--md-ref-typeface-weight-regular)',
      'typescale-body-large-size': '16px',
      'typescale-body-large-tracking': '0.5px',
      'typescale-body-large-line-height': '24px',
      'typescale-body-medium-font': 'var(--md-ref-typeface-plain)',
      'typescale-body-medium-weight': 'var(--md-ref-typeface-weight-regular)',
      'typescale-body-medium-size': '14px',
      'typescale-body-medium-tracking': '0.25px',
      'typescale-body-medium-line-height': '20px',
      'typescale-body-small-font': 'var(--md-ref-typeface-plain)',
      'typescale-body-small-weight': 'var(--md-ref-typeface-weight-regular)',
      'typescale-body-small-size': '12px',
      'typescale-body-small-tracking': '0.4px',
      'typescale-body-small-line-height': '16px',
      'typescale-label-large-font': 'var(--md-ref-typeface-plain)',
      'typescale-label-large-weight': 'var(--md-ref-typeface-weight-medium)',
      'typescale-label-large-size': '14px',
      'typescale-label-large-tracking': '0.1px',
      'typescale-label-large-line-height': '20px',
      'typescale-label-medium-font': 'var(--md-ref-typeface-plain)',
      'typescale-label-medium-weight': 'var(--md-ref-typeface-weight-medium)',
      'typescale-label-medium-size': '12px',
      'typescale-label-medium-tracking': '0.5px',
      'typescale-label-medium-line-height': '16px',
      'typescale-label-small-font': 'var(--md-ref-typeface-plain)',
      'typescale-label-small-weight': 'var(--md-ref-typeface-weight-medium)',
      'typescale-label-small-size': '11px',
      'typescale-label-small-tracking': '0.5px',
      'typescale-label-small-line-height': '16px',
      'shape-corner-full': '100px',
      'shape-corner-extra-large-top':
        'var(--md-sys-shape-corner-extra-large) var(--md-sys-shape-corner-extra-large) 0 0',
      'shape-corner-extra-large': '28px',
      'shape-corner-large-top':
        'var(--md-sys-shape-corner-large) var(--md-sys-shape-corner-large) 0 0',
      'shape-corner-large-end':
        '0 var(--md-sys-shape-corner-large) var(--md-sys-shape-corner-large) 0',
      'shape-corner-large-start':
        'var(--md-sys-shape-corner-large) 0 var(--md-sys-shape-corner-large) 0',
      'shape-corner-large': '16px',
      'shape-corner-medium': '12px',
      'shape-corner-small': '8px',
      'shape-corner-extra-small-top':
        'var(--md-sys-shape-corner-extra-small) var(--md-sys-shape-corner-extra-small) 0 0',
      'shape-corner-extra-small': '4px',
      'shape-corner-none': '0px',
      'state-hover-state-layer-opacity': 0.08,
    },
    ref: {
      'typeface-brand': 'Roboto',
      'typeface-plain': 'Roboto',
      'typeface-weight-medium': 500,
      'typeface-weight-regular': 400,
    },
  };
  const parserConfig = {
    prefix: cssVarPrefix,
    disableCssColorScheme,
    shouldSkipGeneratingVar,
  };
  const { vars, generateThemeVars, generateStyleSheets } = prepareCssVars(theme, parserConfig);
  theme.vars = vars;
  theme.generateThemeVars = generateThemeVars;
  theme.generateStyleSheets = generateStyleSheets;
  theme.getColorSchemeSelector = createGetColorSchemeSelector(selector);
  theme.applyStyles = applyStyles;

  return theme;
}
