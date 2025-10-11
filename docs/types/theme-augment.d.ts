import type { Theme } from '@mui/material/styles';
import type { Components } from '@mui/material/stylesDeprecated';

declare module '@mui/material/styles' {
  interface ThemeComponents extends Components<Theme> {}
}
