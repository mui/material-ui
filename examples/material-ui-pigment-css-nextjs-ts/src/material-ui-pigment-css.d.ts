import { Theme, SxProps } from '@mui/material/styles';
import {} from '@mui/material/themeCssVarsAugmentation';

declare module '@mui/material-pigment-css' {
  interface ThemeArgs {
    theme: Theme;
  }
}

declare global {
  namespace React {
    interface HTMLAttributes {
      sx?: SxProps<Theme>;
    }
    interface SVGProps {
      sx?: SxProps<Theme>;
    }
  }
}
