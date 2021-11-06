import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import defaultTheme, { StaticTheme, darkColorSystem } from './defaultTheme';
import { ColorSystems } from './ColorSystem';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

export interface ColorSchemeOverrides {}

type ExtendedColorScheme = OverridableStringUnion<never, ColorSchemeOverrides>;

type ColorScheme = 'light' | 'dark';

type JoyThemeInput = PartialDeep<Omit<StaticTheme, 'typography'>> & {
  colorSchemes: Record<ColorScheme, PartialDeep<ColorSystems>>;
  typography?: Partial<StaticTheme['typography']>;
};

type ApplicationThemeInput = PartialDeep<Omit<StaticTheme, 'typography'>> & {
  colorSchemes: Record<ExtendedColorScheme, ColorSystems>;
  typography?: Partial<StaticTheme['typography']>;
};

const { palette, opacity, ...rest } = defaultTheme;

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  JoyThemeInput,
  ColorScheme,
  ApplicationThemeInput,
  ExtendedColorScheme
>({
  theme: {
    colorSchemes: {
      light: {
        palette,
        opacity,
      },
      dark: darkColorSystem,
    },
    ...rest,
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'joy',
  shouldSkipVar: (keys) => keys[0] === 'typography',
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
