import type { PaletteOptions } from './createPalette';
import type { ColorSystemOptions } from './createThemeFoundation';
import type { CssVarsThemeOptions, DefaultColorScheme } from './createThemeWithVars';
import createThemeWithVars from './createThemeWithVars';
import type { Theme } from './createThemeNoVars';

export type { Theme, CssThemeVariables, FocusVisible } from './createThemeNoVars';

type CssVarsConfigList =
  | 'colorSchemeSelector'
  | 'rootSelector'
  | 'disableCssColorScheme'
  | 'cssVarPrefix'
  | 'shouldSkipGeneratingVar'
  | 'nativeColor';

export interface ThemeOptions
  extends ColorSystemOptions, Omit<CssVarsThemeOptions, CssVarsConfigList> {
  /**
   * The theme always generates CSS theme variables (`theme.vars`).
   * Pass an object to configure them.
   */
  cssVariables?: true | Pick<CssVarsThemeOptions, CssVarsConfigList> | undefined;
  palette?: PaletteOptions | undefined;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createTheme(
  options: ThemeOptions = {} as any, // cast type to skip module augmentation test
  ...args: object[]
): Theme {
  const {
    palette,
    cssVariables,
    colorSchemes: initialColorSchemes = !palette ? { light: true } : undefined,
    defaultColorScheme: initialDefaultColorScheme = palette?.mode,
    ...other
  } = options;
  const defaultColorSchemeInput = (initialDefaultColorScheme as DefaultColorScheme) || 'light';
  const defaultScheme = initialColorSchemes?.[defaultColorSchemeInput];
  const colorSchemesInput = {
    ...initialColorSchemes,
    ...(palette
      ? {
          [defaultColorSchemeInput]: {
            ...(typeof defaultScheme !== 'boolean' && defaultScheme),
            palette,
          },
        }
      : undefined),
  };

  if (process.env.NODE_ENV !== 'production') {
    if ((cssVariables as unknown) === false) {
      console.error(
        [
          'MUI: `cssVariables: false` is no longer supported, the theme always generates CSS theme variables.',
          'Remove the `cssVariables` option from `createTheme()`.',
          'See https://mui.com/material-ui/migration/upgrade-to-v10/#css-theme-variables-are-always-on',
        ].join('\n'),
      );
    }
  }

  if (!palette && !('light' in colorSchemesInput) && defaultColorSchemeInput === 'light') {
    colorSchemesInput.light = true;
  }

  return createThemeWithVars(
    {
      ...other,
      colorSchemes: colorSchemesInput,
      defaultColorScheme: defaultColorSchemeInput,
      ...(typeof cssVariables === 'object' && cssVariables),
    },
    ...args,
  );
}
