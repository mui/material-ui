import { JoyTheme } from '@mui/joy/styles';

declare module '@mui/icons-material/utils/SvgIcon' {
  interface SvgIconThemeOverrides extends JoyTheme {}

  interface SvgIconPropsSizeOverrides {
    small: false;
    medium: false;
    large: false;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xl2: true;
    xl3: true;
    xl4: true;
    xl5: true;
    xl6: true;
  }

  interface SvgIconPropsColorOverrides {
    secondary: false;
    action: false;
    disabled: false;
    error: false;
    danger: true;
  }
}

// disable automatic export
export {};
