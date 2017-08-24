import { Color, Contrast } from '..';

export type Shade = {
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
    icon: string;
    divider: string;
    lightDivider: string;
  };
  input: {
    bottomLine: string;
    helperText: string;
    labelText: string;
    inputText: string;
    disabled: string;
  };
  action: {
    active: string;
    disabled: string;
  };
  background: {
    default: string;
    paper: string;
    appBar: string;
    contentFrame: string;
    status: string;
  };
};

export const light: Shade;
export const dark: Shade;

type PaletteOptions = {
  primary: Color;
  secondary: Color;
  error: Color;
  type: Contrast;
};

export type Palette = {
  grey: Color;
  getContrastText: (color: string) => string;
} & PaletteOptions &
  Shade;

export default function createPalette(
  options?: Partial<PaletteOptions>
): Palette;
