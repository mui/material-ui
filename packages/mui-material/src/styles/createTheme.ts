import createPalette from './createPalette';
import createThemeWithVars, {
  CssVarsThemeOptions,
  ColorSystem,
  DefaultColorScheme,
} from './createThemeWithVars';
import createThemeNoVars, { Theme, ThemeOptions } from './createThemeNoVars';

export type { ThemeOptions, Theme, CssThemeVariables } from './createThemeNoVars';

// eslint-disable-next-line consistent-return
function attachColorScheme(
  theme: { colorSchemes?: Partial<Record<string, any>> },
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
  options: Omit<ThemeOptions, 'components'> &
    Pick<CssVarsThemeOptions, 'defaultColorScheme' | 'colorSchemes' | 'components'> & {
      cssVariables?:
        | boolean
        | Pick<
            CssVarsThemeOptions,
            | 'colorSchemeSelector'
            | 'rootSelector'
            | 'disableCssColorScheme'
            | 'cssVarPrefix'
            | 'shouldSkipGeneratingVar'
          >;
    } = {} as any, // cast type to skip module augmentation test
  ...args: object[]
): Theme {
  const {
    palette,
    cssVariables = false,
    colorSchemes: initialColorSchemes = !palette ? { light: true } : undefined,
    defaultColorScheme: initialDefaultColorScheme = palette?.mode,
    ...rest
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
      return createThemeNoVars(options as ThemeOptions, ...args);
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
      { ...options, palette: paletteOptions } as ThemeOptions,
      ...args,
    ) as unknown as Theme & {
      defaultColorScheme?: 'light' | 'dark';
      colorSchemes?: Partial<Record<string, any>>;
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

    return theme;
  }

  if (!palette && !('light' in colorSchemesInput) && defaultColorSchemeInput === 'light') {
    colorSchemesInput.light = true;
  }

  return createThemeWithVars(
    {
      ...rest,
      colorSchemes: colorSchemesInput,
      defaultColorScheme: defaultColorSchemeInput,
      ...(typeof cssVariables !== 'boolean' && cssVariables),
    },
    ...args,
  );
}
