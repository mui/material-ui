import { OverridableStringUnion } from '@mui/types';
/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */
export interface PaletteRange {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  channel500: string;
}

export interface ColorPalettePropOverrides {}

export type ColorPaletteProp = OverridableStringUnion<
  'brand' | 'neutral',
  ColorPalettePropOverrides
>;

export type ColorPalette = {
  [k in ColorPaletteProp]: PaletteRange;
};

export interface Palette extends ColorPalette {}

export interface ColorSystems {
  palette: Palette;
}
