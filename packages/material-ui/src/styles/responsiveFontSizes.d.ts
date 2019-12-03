import { Theme } from './createMuiTheme';
import { Breakpoint } from './createBreakpoints';
import { ThemeStyle } from './createTypography';

export interface ResponsiveFontSizesOptions {
  breakpoints?: Breakpoint[];
  disableAlign?: boolean;
  factor?: number;
  variants?: ThemeStyle[];
}

export default function responsiveFontSizes(
  theme: Theme,
  options?: ResponsiveFontSizesOptions,
): Theme;
