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
  appBar: string;
  status: string;
  avatar: string;
}

type PaletteColor = Partial<
  | {
      light?: string;
      main: string;
      dark?: string;
      contrastText?: string;
    }
  | Color
>;

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
  types: {
    dark: TypeObject;
    light: TypeObject;
  };
  text: TypeText;
  action: TypeAction;
  background: TypeBackground;
  getContrastText: (color: string) => string;
}

type PartialTypeObject = { [P in keyof TypeObject]?: Partial<TypeObject[P]> };
type ColorPartial = Partial<Color>;

export interface PaletteOptions {
  common?: Partial<CommonColors>;
  type?: PaletteType;
  primary?: PaletteColor;
  secondary?: PaletteColor;
  error?: PaletteColor;
  grey?: ColorPartial;
  types?: {
    dark?: PartialTypeObject;
    light?: PartialTypeObject;
  };
  text?: Partial<TypeText>;
  action?: Partial<TypeAction>;
  background?: Partial<TypeBackground>;
  getContrastText?: (color: string) => string;
}

//export type PaletteOptions = DeepPartial<Palette>;

export default function createPalette(palette: PaletteOptions): Palette;
