import { MD3ColorSchemeTokens, MD3Palettes } from '../Theme.types';

export type ColorSchemeGenerator = (
  getCssVar: (cssVar: string, defaultValue: string) => string,
  palette: MD3Palettes,
) => Partial<Record<keyof MD3ColorSchemeTokens, string>>;
