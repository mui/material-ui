import { ThemeOptions as MDThemeOptions, BaseTheme } from '@mui/md-theme';
import { SxProps, CSSObject, SxConfig } from '@mui/system';
import { Components } from './components';

export interface ThemeOptions extends MDThemeOptions {
  components?: Components<Omit<Theme, 'components'>>;
}

export interface Theme extends Omit<BaseTheme, 'unstable_sx'> {
  components?: Components<BaseTheme>;
  unstable_sx: (props: SxProps<Theme>) => CSSObject;
  unstable_sxConfig: SxConfig;
}

/**
 * @deprecated
 * Use `import { createTheme } from '@mui/material/styles'` instead.
 */
export function createMuiTheme(options?: ThemeOptions, ...args: object[]): Theme;

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;
