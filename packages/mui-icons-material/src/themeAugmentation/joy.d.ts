import { JoyTheme, FontSize, ColorPaletteProp } from '@mui/joy/styles';

declare module '@mui/material/SvgIcon' {
  interface SvgIconThemeOverrides extends JoyTheme {}

  interface SvgIconPropsSizeOverrides extends Record<keyof FontSize, true> {
    small: false;
    medium: false;
    large: false;
  }

  interface SvgIconPropsColorOverrides extends Record<ColorPaletteProp, true> {
    secondary: false;
    action: false;
    disabled: false;
    error: false;
  }
}

// disable automatic export
export {};
