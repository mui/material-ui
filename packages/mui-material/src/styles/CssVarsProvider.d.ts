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

/**
 * This component is an experimental Theme Provider that generates CSS variabels out of the theme tokens.
 * It should preferably be used at **the root of your component tree**.
 */
type CssVarsProvider = MDCreateCssVarsProviderResult['CssVarsProvider'];

export { useColorScheme, getInitColorSchemeScript };
