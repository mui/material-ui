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

export default function createTheme(
  options: Omit<ThemeOptions, 'components'> &
    Pick<CssVarsThemeOptions, 'defaultColorScheme' | 'colorSchemes' | 'components'> & {
      customProperties?:
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
    colorSchemes: initialColorSchemes = !palette ? { light: true } : undefined,
    defaultColorScheme: initialDefaultColorScheme = palette?.mode,
    customProperties,
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

  if (customProperties === false) {
    // @ts-expect-error ignore mismatch types here
    const theme = createThemeNoVars(options, ...args) as unknown as Theme;
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

    theme.defaultColorScheme = defaultColorSchemeInput;
    return theme;
  }

  return createThemeWithVars(
    {
      ...rest,
      colorSchemes: colorSchemesInput,
      defaultColorScheme: defaultColorSchemeInput,
      ...(typeof customProperties !== 'boolean' && customProperties),
    },
    ...args,
  );
}
