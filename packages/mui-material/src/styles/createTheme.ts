import createPalette from './createPalette';
import type { PaletteOptions } from './createPalette';
import {
  resolveFocusVisible,
  mergeFocusVisibleInput,
  isOutlineColorFromResolvedRing,
} from './focusVisible';
import type { ColorSystemOptions } from './createThemeFoundation';
import type { CssVarsThemeOptions, ColorSystem, DefaultColorScheme } from './createThemeWithVars';
import createThemeWithVars from './createThemeWithVars';
import type {
  Theme,
  CssThemeVariables,
  ThemeOptions as ThemeNoVarsOptions,
} from './createThemeNoVars';
import createThemeNoVars from './createThemeNoVars';
import { themeBuildKey, isColorSchemeCopy } from './themeComposition';

export type {
  Theme,
  CssThemeVariables,
  FocusVisible,
  FocusVisibleOptions,
} from './createThemeNoVars';

type CssVarsOptions = CssThemeVariables extends {
  enabled: true;
}
  ? ColorSystemOptions
  : {};

type CssVarsConfigList =
  | 'colorSchemeSelector'
  | 'rootSelector'
  | 'disableCssColorScheme'
  | 'cssVarPrefix'
  | 'shouldSkipGeneratingVar'
  | 'nativeColor';

export interface ThemeOptions extends CssVarsOptions, Omit<CssVarsThemeOptions, CssVarsConfigList> {
  cssVariables?: boolean | Pick<CssVarsThemeOptions, CssVarsConfigList> | undefined;
  palette?: PaletteOptions | undefined;
}

/**
 * A theme passed back has, at the top level, a copy of the palette of one of its color schemes,
 * see `isColorSchemeCopy()`. The copy isn't needed, and a changed one goes to that color scheme.
 */
function getPaletteColorScheme(
  palette: Record<keyof any, any> | undefined,
  colorSchemes: Partial<Record<string, any>> | undefined,
  defaultColorScheme: DefaultColorScheme,
) {
  const record = palette?.[themeBuildKey];
  const scheme =
    record && colorSchemes
      ? (Object.keys(colorSchemes).find(
          (key) => colorSchemes[key]?.palette?.[themeBuildKey] === record,
        ) as DefaultColorScheme | undefined)
      : undefined;
  if (!scheme) {
    return { scheme: defaultColorScheme, palette };
  }
  const schemePalette = colorSchemes![scheme].palette;
  const defaultPalette = colorSchemes![defaultColorScheme]?.palette;
  if (isColorSchemeCopy(palette, schemePalette, defaultPalette)) {
    return { scheme, palette: undefined };
  }
  if (scheme === defaultColorScheme) {
    return { scheme, palette };
  }
  // Without the values that the copy took from the default palette.
  const output = { ...palette };
  Object.keys(output).forEach((key) => {
    if (!(key in schemePalette) && output[key] === defaultPalette?.[key]) {
      delete output[key];
    }
  });
  return { scheme, palette: output };
}

// eslint-disable-next-line consistent-return
function attachColorScheme(
  theme: { colorSchemes?: Partial<Record<string, any>> | undefined },
  scheme: 'light' | 'dark',
  colorScheme: boolean | Record<string, any> | undefined,
) {
  if (!theme.colorSchemes) {
    return undefined;
  }
  if (colorScheme) {
    theme.colorSchemes[scheme] = {
      ...(colorScheme !== true && colorScheme),
      palette: createPalette({
        ...(colorScheme === true ? {} : colorScheme.palette),
        mode: scheme,
      } as any), // cast type to skip module augmentation test
    };
  }
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
    // A theme created with CSS variables keeps them when it's passed back, for example in `createTheme(theme, { palette })`.
    cssVariables = themeBuildKey in options,
    colorSchemes: initialColorSchemes = !palette ? { light: true } : undefined,
    defaultColorScheme: initialDefaultColorScheme = palette?.mode,
    ...other
  } = options;
  const defaultColorSchemeInput = (initialDefaultColorScheme as DefaultColorScheme) || 'light';
  // The `palette` goes to the default color scheme, unless it comes from a theme passed back.
  const paletteScheme = getPaletteColorScheme(
    palette,
    initialColorSchemes,
    defaultColorSchemeInput,
  );
  const schemeInput = initialColorSchemes?.[paletteScheme.scheme];
  const colorSchemesInput = {
    ...initialColorSchemes,
    ...(paletteScheme.palette
      ? {
          [paletteScheme.scheme]: {
            ...(typeof schemeInput !== 'boolean' && schemeInput),
            palette: paletteScheme.palette,
          },
        }
      : undefined),
  };

  if (cssVariables === false) {
    if (!('colorSchemes' in options)) {
      // Behaves exactly as v5
      return createThemeNoVars(options as ThemeNoVarsOptions, ...args);
    }

    let paletteOptions = palette;
    if (!('palette' in options)) {
      if (colorSchemesInput[defaultColorSchemeInput]) {
        if (colorSchemesInput[defaultColorSchemeInput] !== true) {
          paletteOptions = colorSchemesInput[defaultColorSchemeInput].palette;
        } else if (defaultColorSchemeInput === 'dark') {
          paletteOptions = { mode: 'dark' };
        }
      }
    }

    const theme = createThemeNoVars(
      { ...options, palette: paletteOptions } as ThemeNoVarsOptions,
      ...args,
    ) as unknown as Theme & {
      defaultColorScheme?: 'light' | 'dark' | undefined;
      colorSchemes?: Partial<Record<string, any>> | undefined;
    };

    theme.defaultColorScheme = defaultColorSchemeInput;
    theme.colorSchemes = colorSchemesInput as Record<string, ColorSystem>;

    if (theme.palette.mode === 'light') {
      theme.colorSchemes.light = {
        ...(colorSchemesInput.light !== true && colorSchemesInput.light),
        palette: theme.palette,
      } as ColorSystem;
      attachColorScheme(theme, 'dark', colorSchemesInput.dark);
    }
    if (theme.palette.mode === 'dark') {
      theme.colorSchemes.dark = {
        ...(colorSchemesInput.dark !== true && colorSchemesInput.dark),
        palette: theme.palette,
      } as ColorSystem;
      attachColorScheme(theme, 'light', colorSchemesInput.light);
    }

    if (theme.focusVisible != null && theme.focusVisible !== false) {
      let focusVisibleInput = theme.focusVisible;
      const rawFocusVisible = mergeFocusVisibleInput(options.focusVisible, args);
      const authoredColor =
        rawFocusVisible && typeof rawFocusVisible === 'object'
          ? rawFocusVisible.outlineColor
          : undefined;
      // A re-composed theme carries a baked default that looks authored, so it falls back to value
      // equality — the one case where a pinned `primary.main` is indistinguishable and gets reset.
      if (
        !authoredColor ||
        (isOutlineColorFromResolvedRing(options.focusVisible, args) &&
          authoredColor === theme.palette.primary.main)
      ) {
        const { outlineColor, ...rest } = focusVisibleInput;
        focusVisibleInput = rest;
      }
      Object.keys(theme.colorSchemes).forEach((scheme) => {
        const schemePalette = theme.colorSchemes?.[scheme]?.palette;
        if (schemePalette?.primary) {
          theme.colorSchemes![scheme].focusVisible = resolveFocusVisible(
            focusVisibleInput,
            schemePalette.primary.main,
          );
        }
      });
    }

    return theme;
  }

  if (!palette && !('light' in colorSchemesInput) && defaultColorSchemeInput === 'light') {
    colorSchemesInput.light = true;
  }

  return createThemeWithVars(
    {
      ...other,
      colorSchemes: colorSchemesInput,
      defaultColorScheme: defaultColorSchemeInput,
      ...(typeof cssVariables !== 'boolean' && cssVariables),
    },
    ...args,
  );
}
