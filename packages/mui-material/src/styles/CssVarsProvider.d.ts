/* eslint-disable @typescript-eslint/naming-convention */
import { CreateCssVarsProviderResult } from '@mui/system';
import { ThemeOptions, SupportedColorScheme } from './experimental_extendTheme';
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

declare const useColorScheme: MDCreateCssVarsProviderResult['useColorScheme'];
declare const getInitColorSchemeScript: MDCreateCssVarsProviderResult['getInitColorSchemeScript'];

/**
 * This component is an experimental Theme Provider that generates CSS variabels out of the theme tokens.
 * It should preferably be used at **the root of your component tree**.
 */
declare const Experimental_CssVarsProvider: MDCreateCssVarsProviderResult['CssVarsProvider'];

export { useColorScheme, getInitColorSchemeScript, Experimental_CssVarsProvider };
