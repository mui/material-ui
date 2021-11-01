import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import defaultTheme, { ColorSystems, StaticTheme } from './defaultTheme';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

export interface ColorSchemeOverrides {}

type ExtendedColorScheme = OverridableStringUnion<never, ColorSchemeOverrides>;

type ColorScheme = 'light';

interface JoyThemeInput extends StaticTheme {
  colorSchemes: Record<ColorScheme | ExtendedColorScheme, ColorSystems>;
}

type ApplicationThemeInput = {
  colorSchemes: Record<ColorScheme | ExtendedColorScheme, PartialDeep<ColorSystems>>;
  typography?: Partial<StaticTheme['typography']>;
} & PartialDeep<Omit<StaticTheme, 'typography'>>;

const { palette, ...rest } = defaultTheme;

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  JoyThemeInput,
  ColorScheme,
  ExtendedColorScheme,
  ApplicationThemeInput
>({
  theme: {
    colorSchemes: {
      light: {
        palette,
      },
    },
    ...rest,
  } as unknown as JoyThemeInput, // prevent error from module augmentation inside the repository
  defaultColorScheme: 'light',
  prefix: 'joy',
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
