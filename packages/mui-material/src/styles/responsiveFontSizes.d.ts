import { Breakpoint } from '@mui/system';
import { Typography } from './createTypography';

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
