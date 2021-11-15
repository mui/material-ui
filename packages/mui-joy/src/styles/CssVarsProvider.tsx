import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import defaultTheme, {
  StaticTheme,
  ColorScheme,
  lightColorSystem,
  darkColorSystem,
} from './defaultTheme';
import { ColorSystems } from './ColorSystem';

type PartialDeep<T> = {
  [K in keyof T]?: PartialDeep<T[K]>;
};

export interface ColorSchemeOverrides {}

export type ExtendedColorScheme = OverridableStringUnion<never, ColorSchemeOverrides>;

export type SupportedColorScheme = ColorScheme | ExtendedColorScheme;

type JoyThemeInput = PartialDeep<Omit<StaticTheme, 'typography'>> & {
  colorSchemes: Record<ColorScheme, PartialDeep<ColorSystems>>;
  typography?: Partial<StaticTheme['typography']>;
};

type ApplicationThemeInput = PartialDeep<Omit<StaticTheme, 'typography'>> & {
  colorSchemes: Record<ExtendedColorScheme, ColorSystems>;
  typography?: Partial<StaticTheme['typography']>;
};

const { palette, ...rest } = defaultTheme;

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  JoyThemeInput,
  ColorScheme,
  ApplicationThemeInput,
  ExtendedColorScheme
>({
  theme: {
    ...rest,
    colorSchemes: {
      light: lightColorSystem,
      dark: darkColorSystem,
    },
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  prefix: 'joy',
  shouldSkipGeneratingVar: (keys) =>
    keys[0] === 'typography' || keys[0] === 'variant' || keys[0] === 'pattern',
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
