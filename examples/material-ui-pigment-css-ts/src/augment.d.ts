import { Theme, SxProps } from "@mui/material/styles";
import {} from "@mui/material/themeCssVarsAugmentation";

declare module "@mui/material-pigment-css/theme" {
  interface ThemeArgs {
    theme: Theme;
  }
}

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      sx?: SxProps<Theme>;
    }
  }
}
