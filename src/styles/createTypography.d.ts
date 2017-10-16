import * as React from 'react';
import { Palette } from './createPalette';

export type TextStyle =
  | 'display1'
  | 'display2'
  | 'display3'
  | 'display4'
  | 'headline'
  | 'title'
  | 'subheading'
  | 'body1'
  | 'body2'
  | 'caption';

export type Style = TextStyle | 'button';

export interface FontStyle {
  fontFamily: React.CSSProperties['fontFamily'];
  fontSize: React.CSSProperties['fontSize'];
  fontWeightLight: number | string;
  fontWeightRegular: number | string;
  fontWeightMedium: number | string;
  htmlFontSize?: number;
}

export interface TypographyStyle {
  color?: React.CSSProperties['color'];
  fontFamily: React.CSSProperties['fontFamily'];
  fontSize: React.CSSProperties['fontSize'];
  fontWeight: React.CSSProperties['fontWeight'];
  letterSpacing?: React.CSSProperties['letterSpacing'];
  lineHeight: React.CSSProperties['lineHeight'];
  textTransform?: React.CSSProperties['textTransform'];
}

export type Typography = { [type in Style]: TypographyStyle } & FontStyle;

export type TypographyOptions = Partial<FontStyle> & Partial<Typography>;

export default function createTypography(
  palette: Palette,
  typography: TypographyOptions | ((palette: Palette) => TypographyOptions)
): Typography;
