import { Color, Contrast } from '..';
import commonColors from '../colors/common';

type ShadeText = {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
  icon: string;
  divider: string;
  lightDivider: string;
};

type ShadeInput = {
  bottomLine: string;
  helperText: string;
  labelText: string;
  inputText: string;
  disabled: string;
};

type ShadeAction = {
  active: string;
  disabled: string;
};

type ShadeBackground = {
  default: string;
  paper: string;
  appBar: string;
  contentFrame: string;
  status: string;
};

export type Shade = {
  text: ShadeText;
  input: ShadeInput;
  action: ShadeAction;
  background: ShadeBackground;
};

export const light: Shade;
export const dark: Shade;

export type Palette = {
  common: typeof commonColors;
  type: Contrast;
  primary: Color;
  secondary: Color;
  error: Color;
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
};

export default function createPalette(
  palette: Partial<Palette>
): Palette;
