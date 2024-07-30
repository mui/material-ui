import createPalette from '../createPalette';
import createThemeWithVars, { CssVarsThemeOptions, ColorSystem } from './createThemeWithVars';
import createThemeNoVars, { Theme, ThemeOptions } from './createThemeNoVars';

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
        ...(colorScheme === true ? {} : colorScheme),
        mode: scheme,
      }),
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
            | 'disableCssColorScheme'
            | 'cssVarPrefix'
            | 'shouldSkipGeneratingVar'
          >;
    } = {},
  ...args: object[]
): Theme {
  const {
    palette,
    cssVariables = false,
    colorSchemes: initialColorSchemes = !palette ? { light: true } : undefined,
    defaultColorScheme: initialDefaultColorScheme = palette?.mode,
    ...rest
  } = options;
  const defaultColorSchemeInput = initialDefaultColorScheme || 'light';
  const colorSchemesInput = {
    ...initialColorSchemes,
    ...(palette
      ? {
          [defaultColorSchemeInput]: {
            ...(initialColorSchemes as undefined | Record<'light' | 'dark', any>)?.[
              defaultColorSchemeInput
            ],
            palette,
          },
        }
      : undefined),
  };

  if (cssVariables === false) {
    // @ts-expect-error ignore mismatch types here
    const theme = createThemeNoVars(options, ...args) as unknown as Theme;
    theme.defaultColorScheme = defaultColorSchemeInput;

    if (!('colorSchemes' in options)) {
      return theme;
    }

    theme.colorSchemes = {};

    if (theme.palette.mode === 'light') {
      theme.colorSchemes = { light: { palette: theme.palette } as ColorSystem };
      attachColorScheme(theme, 'dark', colorSchemesInput.dark);
    }
    if (theme.palette.mode === 'dark') {
      theme.colorSchemes = { dark: { palette: theme.palette } as ColorSystem };
      attachColorScheme(theme, 'light', colorSchemesInput.light);
    }

    return theme;
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
