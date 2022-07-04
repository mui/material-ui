import type {
  CssVarsTheme,
  PaletteCommonChannel,
  PaletteColorChannel,
  PaletteTextChannel,
  PaletteActionChannel,
} from '../styles/experimental_extendTheme';

/**
 * Enhance the theme types to include new properties from the CssVarsProvider.
 * The theme is typed with CSS variables in `styled`, `sx`, `useTheme`, etc.
 */
declare module '@mui/material/styles' {
  interface Theme extends CssVarsTheme {}
}

declare module '@mui/material/styles/createPalette' {
  interface CommonColors extends PaletteCommonChannel {}

  interface PaletteColor extends PaletteColorChannel {}

  interface TypeText extends PaletteTextChannel {}

  interface TypeAction extends PaletteActionChannel {}
}
