import { Color, PaletteType } from '..';
import { CommonColors } from '../colors/common';

export interface TypeText {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
}

export interface TypeAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  disabled: string;
  disabledBackground: string;
}

export interface TypeBackground {
  default: string;
  paper: string;
}

export type TypeDivider = string;

export type PaletteColorOptions = SimplePaletteColorOptions | Partial<Color>;

export interface SimplePaletteColorOptions {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

export interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface TypeObject {
  text: TypeText;
  action: TypeAction;
  divider: TypeDivider;
  background: TypeBackground;
}

export const light: TypeObject;
export const dark: TypeObject;

export interface Palette {
  common: CommonColors;
  type: PaletteType;
  contrastThreshold: number;
  tonalOffset: number;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  grey: Color;
  text: TypeText;
  divider: TypeDivider;
  action: TypeAction;
  background: TypeBackground;
  getContrastText: (background: string) => string;
  augmentColor: (
    color: SimplePaletteColorOptions,
    mainShade: number | string,
    lightShade: number | string,
    darkShade: number | string,
  ) => void;
}

export type PartialTypeObject = { [P in keyof TypeObject]?: Partial<TypeObject[P]> };
export type ColorPartial = Partial<Color>;

export interface PaletteOptions {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
  type?: PaletteType;
  tonalOffset?: number;
  contrastThreshold?: number;
  common?: Partial<CommonColors>;
  grey?: ColorPartial;
  text?: Partial<TypeText>;
  divider?: string;
  action?: Partial<TypeAction>;
  background?: Partial<TypeBackground>;
  getContrastText?: (background: string) => string;
}

export default function createPalette(palette: PaletteOptions): Palette;
