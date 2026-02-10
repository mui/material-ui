'use client';
import { unstable_createGetCssVar as createGetCssVar } from '@mui/system';
import { ColorPaletteProp, ColorSystem } from '../styles/types';
import { DefaultColorScheme, ExtendedColorScheme } from '../styles/types/colorScheme';

interface ThemeFragment {
  cssVarPrefix?: string;
  colorSchemes: { [k: string]: ColorSystem | undefined };
  getCssVar: (...args: any[]) => string;
  palette: Record<string, any>;
  getColorSchemeSelector: (colorScheme: DefaultColorScheme | ExtendedColorScheme) => string;
}

const createPrefixVar = (cssVarPrefix: string | undefined | null) => {
  return (cssVar: string) =>
    `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}${cssVar.replace(/^--/, '')}`;
};

export const INVERTED_COLORS_ATTR = 'data-skip-inverted-colors';

export const INVERTED_COLORS_SELECTOR = `& :not([${INVERTED_COLORS_ATTR}], [${INVERTED_COLORS_ATTR}] *)`;

// Apply cyclic variables to the component to use fallback values.
// Color inversion variables from the parent will be neglected.
export const skipInvertedColors = (theme: ThemeFragment) => {
  const prefixVar = createPrefixVar(theme.cssVarPrefix);
  return {
    '--variant-plainColor': 'var(--variant-plainColor) !important',
    '--variant-plainHoverColor': 'var(--variant-plainHoverColor) !important',
    '--variant-plainHoverBg': 'var(--variant-plainHoverBg) !important',
    '--variant-plainActiveBg': 'var(--variant-plainActiveBg) !important',
    '--variant-plainDisabledColor': 'var(--variant-plainDisabledColor) !important',

    '--variant-outlinedColor': 'var(--variant-outlinedColor) !important',
    '--variant-outlinedBorder': 'var(--variant-outlinedBorder) !important',
    '--variant-outlinedHoverColor': 'var(--variant-outlinedHoverColor) !important',
    '--variant-outlinedHoverBorder': 'var(--variant-outlinedHoverBorder) !important',
    '--variant-outlinedHoverBg': 'var(--variant-outlinedHoverBg) !important',
    '--variant-outlinedActiveBg': 'var(--variant-outlinedActiveBg) !important',
    '--variant-outlinedDisabledColor': 'var(--variant-outlinedDisabledColor) !important',
    '--variant-outlinedDisabledBorder': 'var(--variant-outlinedDisabledBorder) !important',

    '--variant-softColor': 'var(--variant-softColor) !important',
    '--variant-softHoverColor': 'var(--variant-softHoverColor) !important',
    '--variant-softBg': 'var(--variant-softBg) !important',
    '--variant-softHoverBg': 'var(--variant-softHoverBg) !important',
    '--variant-softActiveBg': 'var(--variant-softActiveBg) !important',
    '--variant-softActiveColor': 'var(--variant-softActiveColor) !important',
    '--variant-softDisabledColor': 'var(--variant-softDisabledColor) !important',
    '--variant-softDisabledBg': 'var(--variant-softDisabledBg) !important',

    '--variant-solidColor': 'var(--variant-solidColor) !important',
    '--variant-solidBg': 'var(--variant-solidBg) !important',
    '--variant-solidHoverBg': 'var(--variant-solidHoverBg) !important',
    '--variant-solidActiveBg': 'var(--variant-solidActiveBg) !important',
    '--variant-solidDisabledColor': 'var(--variant-solidDisabledColor) !important',
    '--variant-solidDisabledBg': 'var(--variant-solidDisabledBg) !important',

    '--Badge-ringColor': 'var(--Badge-ringColor) !important',
    colorScheme: 'unset',
    [theme.getColorSchemeSelector('light')]: {
      [prefixVar('--palette-focusVisible')]:
        `${theme.colorSchemes.light?.palette.focusVisible} !important`,
      [prefixVar('--palette-background-body')]:
        `${theme.colorSchemes.light?.palette.background.body} !important`,
      [prefixVar('--palette-background-surface')]:
        `${theme.colorSchemes.light?.palette.background.surface} !important`,
      [prefixVar('--palette-background-popup')]:
        `${theme.colorSchemes.light?.palette.background.popup} !important`,
      [prefixVar('--palette-background-level1')]:
        `${theme.colorSchemes.light?.palette.background.level1} !important`,
      [prefixVar('--palette-background-level2')]:
        `${theme.colorSchemes.light?.palette.background.level2} !important`,
      [prefixVar('--palette-background-level3')]:
        `${theme.colorSchemes.light?.palette.background.level3} !important`,
      [prefixVar('--palette-text-primary')]:
        `${theme.colorSchemes.light?.palette.text.primary} !important`,
      [prefixVar('--palette-text-secondary')]:
        `${theme.colorSchemes.light?.palette.text.secondary} !important`,
      [prefixVar('--palette-text-tertiary')]:
        `${theme.colorSchemes.light?.palette.text.tertiary} !important`,
      [prefixVar('--palette-divider')]: `${theme.colorSchemes.light?.palette.divider} !important`,
    },
    [theme.getColorSchemeSelector('dark')]: {
      [prefixVar('--palette-focusVisible')]:
        `${theme.colorSchemes.dark?.palette.focusVisible} !important`,
      [prefixVar('--palette-background-body')]:
        `${theme.colorSchemes.dark?.palette.background.body} !important`,
      [prefixVar('--palette-background-surface')]:
        `${theme.colorSchemes.dark?.palette.background.surface} !important`,
      [prefixVar('--palette-background-popup')]:
        `${theme.colorSchemes.dark?.palette.background.popup} !important`,
      [prefixVar('--palette-background-level1')]:
        `${theme.colorSchemes.dark?.palette.background.level1} !important`,
      [prefixVar('--palette-background-level2')]:
        `${theme.colorSchemes.dark?.palette.background.level2} !important`,
      [prefixVar('--palette-background-level3')]:
        `${theme.colorSchemes.dark?.palette.background.level3} !important`,
      [prefixVar('--palette-text-primary')]:
        `${theme.colorSchemes.dark?.palette.text.primary} !important`,
      [prefixVar('--palette-text-secondary')]:
        `${theme.colorSchemes.dark?.palette.text.secondary} !important`,
      [prefixVar('--palette-text-tertiary')]:
        `${theme.colorSchemes.dark?.palette.text.tertiary} !important`,
      [prefixVar('--palette-divider')]: `${theme.colorSchemes.dark?.palette.divider} !important`,
    },
  };
};

// @internal
// to support the same usage between `sx` prop and `styled` function, need to resolve the `theme`.
//  sx: (theme) => ...
//  styled: ({ theme }) => ...
function isStyledThemeProp(
  props: ThemeFragment | { theme?: ThemeFragment },
): props is { theme: ThemeFragment } {
  return (props as { theme?: ThemeFragment }).theme !== undefined;
}

/**
 *
 * @param color a supported theme color palette
 * @returns (theme: ThemeFragment) => Record<DefaultColorPalette, CSSObject>
 */
export const applySolidInversion =
  (color: ColorPaletteProp) => (themeProp: ThemeFragment | { theme?: ThemeFragment }) => {
    const theme = isStyledThemeProp(themeProp) ? themeProp.theme : (themeProp as ThemeFragment);
    const getCssVarDefault = createGetCssVar(theme.cssVarPrefix);
    const prefixVar = createPrefixVar(theme.cssVarPrefix);
    const getCssVar = (cssVar: string) => {
      const tokens = cssVar.split('-');
      return getCssVarDefault(cssVar, theme.palette[tokens[1]][tokens[2]]);
    };

    return {
      [INVERTED_COLORS_SELECTOR]: {
        '--Badge-ringColor': getCssVar(`palette-${color}-solidBg`),
        '--Icon-color': 'currentColor',
        [`${theme.getColorSchemeSelector('light')}, ${theme.getColorSchemeSelector('dark')}`]: {
          colorScheme: 'dark',
          [prefixVar('--palette-focusVisible')]: getCssVar(`palette-${color}-200`),
          [prefixVar('--palette-background-body')]: 'rgba(0 0 0 / 0.1)',
          [prefixVar('--palette-background-surface')]: 'rgba(0 0 0 / 0.06)',
          [prefixVar('--palette-background-popup')]: getCssVar(`palette-${color}-700`),
          [prefixVar('--palette-background-level1')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.2)`,
          [prefixVar('--palette-background-level2')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.36)`,
          [prefixVar('--palette-background-level3')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.6)`,
          [prefixVar('--palette-text-primary')]: getCssVar(`palette-common-white`),
          [prefixVar('--palette-text-secondary')]: getCssVar(`palette-${color}-200`),
          [prefixVar('--palette-text-tertiary')]: getCssVar(`palette-${color}-300`),
          [prefixVar('--palette-text-icon')]: getCssVar(`palette-${color}-200`),
          [prefixVar('--palette-divider')]: `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.32)`,

          '--variant-plainColor': getCssVar(`palette-${color}-50`),
          '--variant-plainHoverColor': `#fff`,
          '--variant-plainHoverBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.12)`,
          '--variant-plainActiveBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.32)`,
          '--variant-plainDisabledColor': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.72)`,

          '--variant-outlinedColor': getCssVar(`palette-${color}-50`),
          '--variant-outlinedBorder': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.5)`,
          '--variant-outlinedHoverColor': `#fff`,
          '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-300`),
          '--variant-outlinedHoverBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.32)`,
          '--variant-outlinedDisabledColor': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.72)`,
          '--variant-outlinedDisabledBorder': `rgba(255 255 255 / 0.2)`,

          '--variant-softColor': getCssVar(`palette-common-white`),
          '--variant-softHoverColor': getCssVar(`palette-common-white`),
          '--variant-softBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.24)`,
          '--variant-softHoverBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.36)`,
          '--variant-softActiveBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.16)`,
          '--variant-softActiveColor': `#fff`,
          '--variant-softDisabledColor': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.72)`,
          '--variant-softDisabledBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.1)`,

          '--variant-solidColor': getCssVar(
            `palette-${color}-${color === 'neutral' ? '600' : '500'}`,
          ),
          '--variant-solidBg': getCssVar(`palette-common-white`),
          '--variant-solidHoverBg': getCssVar(`palette-common-white`),
          '--variant-solidActiveBg': getCssVar(`palette-${color}-100`),
          '--variant-solidDisabledColor': `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.72)`,
          '--variant-solidDisabledBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.1)`,
        },
      },
      [`&, & [${INVERTED_COLORS_ATTR}]`]: skipInvertedColors(theme),
    };
  };

/**
 *
 * @param color a supported theme color palette
 * @returns (theme: ThemeFragment) => Record<DefaultColorPalette, CSSObject>
 */
export const applySoftInversion =
  (color: ColorPaletteProp) => (themeProp: ThemeFragment & { theme?: ThemeFragment }) => {
    const { theme = themeProp } = themeProp;
    const getCssVarDefault = createGetCssVar(theme.cssVarPrefix);
    const prefixVar = createPrefixVar(theme.cssVarPrefix);
    const getCssVar = (cssVar: string) => {
      const tokens = cssVar.split('-');
      return getCssVarDefault(cssVar, theme.palette[tokens[1]][tokens[2]]);
    };

    return {
      [INVERTED_COLORS_SELECTOR]: {
        '--Badge-ringColor': getCssVar(`palette-${color}-softBg`),
        '--Icon-color': 'currentColor',
        [theme.getColorSchemeSelector('dark')]: {
          [prefixVar('--palette-focusVisible')]: getCssVar(`palette-${color}-300`),
          [prefixVar('--palette-background-body')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.1)`,
          [prefixVar('--palette-background-surface')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.08)`,
          [prefixVar('--palette-background-level1')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.2)`,
          [prefixVar('--palette-background-level2')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.4)`,
          [prefixVar('--palette-background-level3')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.6)`,
          [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-100`),
          [prefixVar('--palette-text-secondary')]: `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.72)`,
          [prefixVar('--palette-text-tertiary')]: `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.6)`,
          [prefixVar('--palette-text-icon')]: `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.6)`,
          [prefixVar('--palette-divider')]: `rgba(${getCssVar(
            `palette-${color}-lightChannel`,
          )} / 0.2)`,
          '--variant-plainColor': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 1)`,
          '--variant-plainHoverColor': getCssVar(`palette-${color}-50`),
          '--variant-plainHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.16)`,
          '--variant-plainActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          '--variant-plainDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,

          '--variant-outlinedColor': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 1)`,
          '--variant-outlinedHoverColor': getCssVar(`palette-${color}-50`),
          '--variant-outlinedBg': 'initial',
          '--variant-outlinedBorder': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.4)`,
          '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-600`),
          '--variant-outlinedHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.16)`,
          '--variant-outlinedActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          '--variant-outlinedDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,
          '--variant-outlinedDisabledBorder': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.2)`,

          '--variant-softColor': getCssVar(`palette-${color}-200`),
          '--variant-softBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.24)`,
          '--variant-softHoverColor': '#fff',
          '--variant-softHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.32)`,
          '--variant-softActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.48)`,
          '--variant-softDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,
          '--variant-softDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,

          '--variant-solidColor': '#fff',
          '--variant-solidBg': getCssVar(`palette-${color}-500`),
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': getCssVar(`palette-${color}-600`),
          '--variant-solidActiveBg': getCssVar(`palette-${color}-600`),
          '--variant-solidDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.72)`,
          '--variant-solidDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
        },
        // `light` (default color scheme) should come last in case that `theme.getColorSchemeSelector()` return the same value
        [theme.getColorSchemeSelector('light')]: {
          [prefixVar('--palette-focusVisible')]: getCssVar(`palette-${color}-500`),
          [prefixVar('--palette-background-body')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.1)`,
          [prefixVar('--palette-background-surface')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.08)`,
          [prefixVar('--palette-background-level1')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.2)`,
          [prefixVar('--palette-background-level2')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.32)`,
          [prefixVar('--palette-background-level3')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.48)`,
          [prefixVar('--palette-text-primary')]: getCssVar(`palette-${color}-700`),
          [prefixVar('--palette-text-secondary')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.8)`,
          [prefixVar('--palette-text-tertiary')]: `rgba(${getCssVar(
            `palette-${color}-darkChannel`,
          )} / 0.68)`,
          [prefixVar('--palette-text-icon')]: getCssVar(`palette-${color}-500`),
          [prefixVar('--palette-divider')]: `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.32)`,
          '--variant-plainColor': `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 0.8)`,
          '--variant-plainHoverColor': `rgba(${getCssVar(`palette-${color}-darkChannel`)} / 1)`,
          '--variant-plainHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          '--variant-plainActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.24)`,
          '--variant-plainDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.6)`,

          '--variant-outlinedColor': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 1)`,
          '--variant-outlinedBorder': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.4)`,
          '--variant-outlinedHoverColor': getCssVar(`palette-${color}-600`),
          '--variant-outlinedHoverBorder': getCssVar(`palette-${color}-300`),
          '--variant-outlinedHoverBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.12)`,
          '--variant-outlinedActiveBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.24)`,
          '--variant-outlinedDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.6)`,
          '--variant-outlinedDisabledBorder': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.12)`,

          '--variant-softColor': getCssVar(`palette-${color}-600`),
          '--variant-softBg': `rgba(${getCssVar(`palette-${color}-lightChannel`)} / 0.8)`,
          '--variant-softHoverColor': getCssVar(`palette-${color}-700`),
          '--variant-softHoverBg': getCssVar(`palette-${color}-200`),
          '--variant-softActiveBg': getCssVar(`palette-${color}-300`),
          '--variant-softDisabledColor': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.6)`,
          '--variant-softDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`,

          '--variant-solidColor': getCssVar('palette-common-white'),
          '--variant-solidBg': getCssVar(`palette-${color}-${color === 'neutral' ? '700' : '500'}`),
          '--variant-solidHoverColor': getCssVar('palette-common-white'),
          '--variant-solidHoverBg': getCssVar(
            `palette-${color}-${color === 'neutral' ? '600' : '600'}`,
          ),
          '--variant-solidActiveBg': getCssVar(
            `palette-${color}-${color === 'neutral' ? '600' : '600'}`,
          ),
          '--variant-solidDisabledColor': `rgba(${getCssVar(
            `palette-${color}-mainChannel`,
          )} / 0.6)`,
          '--variant-solidDisabledBg': `rgba(${getCssVar(`palette-${color}-mainChannel`)} / 0.08)`,
        },
      },
      [`&, & [${INVERTED_COLORS_ATTR}]`]: skipInvertedColors(theme),
    };
  };
