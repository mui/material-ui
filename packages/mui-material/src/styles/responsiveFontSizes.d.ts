import type { Breakpoint } from '@mui/system';
import type { Typography } from './createTypography';

export interface ResponsiveFontSizesOptions {
  breakpoints?: Breakpoint[];
  disableAlign?: boolean;
  factor?: number;
  variants?: Array<keyof Typography>;
}

export default function responsiveFontSizes<T extends { typography: Typography }>(
  theme: T,
  options?: ResponsiveFontSizesOptions,
): T;
