declare module '@mui/icons-material/utils/SvgIcon' {
  // @ts-ignore
  import { JoyTheme } from '@mui/joy/styles';

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
  }
}

// disable automatic export
export {};
