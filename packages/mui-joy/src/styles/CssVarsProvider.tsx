import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import defaultTheme, { JoyColorSystems, BaseStaticTheme } from './defaultTheme';
import { ThemeContext } from './ThemeProvider';

export interface JoyColorSchemeOverrides {}

type JoyExtendedColorScheme = OverridableStringUnion<never, JoyColorSchemeOverrides>;

type JoyColorScheme = 'light';

interface JoyThemeInput extends BaseStaticTheme {
  colorSchemes: Record<JoyColorScheme | JoyExtendedColorScheme, JoyColorSystems>;
}

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  JoyThemeInput,
  JoyColorScheme,
  JoyExtendedColorScheme
>(ThemeContext, {
  theme: {
    colorSchemes: {
      light: {
        palette: defaultTheme.palette,
      },
    },
    ...defaultTheme,
  },
  defaultColorScheme: 'light',
  prefix: 'joy',
});

export { CssVarsProvider, useColorScheme, getInitColorSchemeScript };
