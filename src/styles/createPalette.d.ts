import { Color, PaletteType } from '..';
import { CommonColors } from '../colors/common';

interface TypeText {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
}

interface TypeAction {
  active: string;
  hover: string;
  selected: string;
  disabled: string;
  disabledBackground: string;
}

interface TypeBackground {
  default: string;
  paper: string;
}

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
  divider: string;
  action: TypeAction;
  background: TypeBackground;
  getContrastText: (background: string) => string;
  augmentColor: (
    color: string,
    mainShade: number | string,
    lightShade: number | string,
    darkShade: number | string,
  ) => void;
}

type PartialTypeObject = { [P in keyof TypeObject]?: Partial<TypeObject[P]> };
type ColorPartial = Partial<Color>;

export interface PaletteOptions {
  common?: Partial<CommonColors>;
  type?: PaletteType;
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
  grey?: ColorPartial;
  text?: Partial<TypeText>;
  divider?: string;
  action?: Partial<TypeAction>;
  background?: Partial<TypeBackground>;
  getContrastText?: (background: string) => string;
}

//export type PaletteOptions = DeepPartial<Palette>;

export default function createPalette(palette: PaletteOptions): Palette;
