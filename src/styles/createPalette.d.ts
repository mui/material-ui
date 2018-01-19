import { Color, PaletteType } from '..';
import { CommonColors } from '../colors/common';

interface ShadeText {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
  icon: string;
  divider: string;
  lightDivider: string;
}

interface ShadeInput {
  bottomLine: string;
  helperText: string;
  labelText: string;
  inputText: string;
  disabled: string;
}

interface ShadeAction {
  active: string;
  disabled: string;
}

interface ShadeBackground {
  default: string;
  paper: string;
  appBar: string;
  contentFrame: string;
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

export interface Shade {
  text: ShadeText;
  input: ShadeInput;
  action: ShadeAction;
  background: ShadeBackground;
}

export const light: Shade;
export const dark: Shade;

export interface Palette {
  common: CommonColors;
  type: PaletteType;
  contrastThreshold: number;
  tonalOffset: number;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  grey: Color;
  shades: {
    dark: Shade;
    light: Shade;
  };
  text: ShadeText;
  input: ShadeInput;
  action: ShadeAction;
  background: ShadeBackground;
  getContrastText: (color: string) => string;
}

type PartialShade = { [P in keyof Shade]?: Partial<Shade[P]> };
type ColorPartial = Partial<Color>;

export interface PaletteOptions {
  common?: Partial<CommonColors>;
  type?: PaletteType;
  primary?: PaletteColor;
  secondary?: PaletteColor;
  error?: PaletteColor;
  grey?: ColorPartial;
  shades?: {
    dark?: PartialShade;
    light?: PartialShade;
  };
  text?: Partial<ShadeText>;
  input?: Partial<ShadeInput>;
  action?: Partial<ShadeAction>;
  background?: Partial<ShadeBackground>;
  getContrastText?: (color: string) => string;
}

//export type PaletteOptions = DeepPartial<Palette>;

export default function createPalette(palette: PaletteOptions): Palette;
