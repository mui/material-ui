import { Breakpoint } from '@mui/system';
import { Typography } from './createTypography';
import { Theme } from './createTheme';

export interface ResponsiveFontSizesOptions {
  breakpoints?: Breakpoint[];
  disableAlign?: boolean;
  factor?: number;
  variants?: Array<keyof Typography>;
}

export default function responsiveFontSizes<T extends Pick<Theme, 'typography' | 'breakpoints'>>(
  theme: T,
  options?: ResponsiveFontSizesOptions,
): T;
