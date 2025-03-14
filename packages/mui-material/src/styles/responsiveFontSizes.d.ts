import { Breakpoint } from '@mui/system';
import { TypographyVariants } from './createTypography';

export interface ResponsiveFontSizesOptions {
  breakpoints?: Breakpoint[];
  disableAlign?: boolean;
  factor?: number;
  variants?: Array<keyof TypographyVariants>;
}

export default function responsiveFontSizes<T extends { typography: TypographyVariants }>(
  theme: T,
  options?: ResponsiveFontSizesOptions,
): T;
