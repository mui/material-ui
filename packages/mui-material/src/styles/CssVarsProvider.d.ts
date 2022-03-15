import { CreateCssVarsProviderResult } from '@mui/system';
import { ThemeOptions, SupportedColorScheme } from './unstable_createTheme';
import { PaletteWithChannels } from './createPalette';

export interface ThemeInput extends Omit<ThemeOptions, 'colorSchemes'> {
  colorSchemes: Partial<
    Record<
      SupportedColorScheme,
      {
        palette: PaletteWithChannels;
      }
    >
  >;
}

type MDCreateCssVarsProviderResult = CreateCssVarsProviderResult<SupportedColorScheme, ThemeInput>;

type useColorScheme = MDCreateCssVarsProviderResult['useColorScheme'];
type getInitColorSchemeScript = MDCreateCssVarsProviderResult['getInitColorSchemeScript'];
type CssVarsProvider = MDCreateCssVarsProviderResult['CssVarsProvider'];

export { useColorScheme, getInitColorSchemeScript, CssVarsProvider };
