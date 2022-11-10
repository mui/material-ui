import { Interpolation } from '@mui/system';
import { Theme, SxProps } from './types';
import styleFunctionSx from './styleFunctionSx';

export default function sx(styles: SxProps) {
  return ({ theme }: { theme: Theme }) =>
    styleFunctionSx({ sx: styles, theme }) as Interpolation<{ theme: Theme }>;
}
