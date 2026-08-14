import createPalette, { PaletteOptions } from './createPalette';
import { resolveFocusVisible, mergeFocusVisibleInput } from './focusVisible';
import { ColorSystemOptions } from './createThemeFoundation';
import createThemeWithVars, {
  CssVarsThemeOptions,
  ColorSystem,
  DefaultColorScheme,
} from './createThemeWithVars';
import createThemeNoVars, {
  Theme,
  CssThemeVariables,
  ThemeOptions as ThemeNoVarsOptions,
} from './createThemeNoVars';

export type { Theme, CssThemeVariables, FocusVisible } from './createThemeNoVars';

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
    cssVariables = false,
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
          // @ts-ignore to prevent the module augmentation test from failing
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
      // Decide whether `outlineColor` was authored or generated, so a scheme re-resolve only
      // overwrites the latter. Read the raw input, before `resolveFocusVisible` filled a default in.
      const rawFocusVisible = mergeFocusVisibleInput(options.focusVisible, args);
      const rawIsObject = rawFocusVisible != null && typeof rawFocusVisible === 'object';
      // Recomposing (`createTheme(existingTheme, …)`) feeds an already-resolved ring back in, whose
      // `outlineColor` is a baked default, not an author's choice. Only this resolver produces the
      // wired offset calc, so it identifies its own output.
      const isResolvedRing =
        rawIsObject &&
        typeof rawFocusVisible.outlineOffset === 'string' &&
        rawFocusVisible.outlineOffset.includes('--_focusVisible-offset');
      const authoredOutlineColor =
        rawIsObject && 'outlineColor' in rawFocusVisible && !isResolvedRing;
      // Value equality is the last resort, and only for a re-composed ring: it cannot tell a pinned
      // `primary.main` from a generated one, so it is never allowed to override an authored color.
      if (
        !authoredOutlineColor &&
        (!isResolvedRing || focusVisibleInput.outlineColor === theme.palette.primary.main)
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
