import { Breakpoint } from '@mui/system';
import { TypographyProps } from '../Typography';
import { Theme } from './createTheme';

export interface ResponsiveFontSizesOptions {
  breakpoints?: Breakpoint[];
  disableAlign?: boolean;
  factor?: number;
  variants?: Array<TypographyProps['variant']>;
}

export default function responsiveFontSizes(
  theme: Theme,
  options?: ResponsiveFontSizesOptions,
): Theme;
